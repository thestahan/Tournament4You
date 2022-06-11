using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Tournaments;

public class SubmitScore
{
    public record Command : IRequest<Result>
    {
        public int TournamentId { get; set; }
        public int MatchId { get; set; }
        public int Team1Score { get; set; }
        public int Team2Score { get; set; }
    }

    public record Result
    {
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApiDbContext _context;
        private readonly IUserAccessor _userAccessor;

        private const string _tournamentNotFoundException =
            "Tournament with given match id was not found";
        private const string _tournamentAlreadyFinishedException =
            "The tournament has already finished.";
        private const string _matchAlreadyFinishedException =
            "The score for this match has already been submitted.";

        public Handler(ApiDbContext context,
                       IUserAccessor userAccessor,
                       UserManager<AppUser> userManager)
        {
            _context = context;
            _userAccessor = userAccessor;
            _userManager = userManager;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = _userAccessor.User;
            var userAccount = await _userManager.FindByEmailAsync(user.FindFirstValue(ClaimTypes.Email));

            var tournament = await _context.Tournaments
                .Include(t => t.Teams)
                .Include(t => t.Rounds)
                    .ThenInclude(r => r.Matches)
                .Where(t => t.Id == request.TournamentId &&
                            t.OrganizerId == userAccount.Id &&
                            t.Rounds.Any(r => r.Matches.Any(m => m.Id == request.MatchId)))
                .FirstOrDefaultAsync(cancellationToken);

            if (tournament is null)
            {
                throw new ApiObjectNotFoundException(_tournamentNotFoundException);
            }

            if (tournament.HasFinished)
            {
                throw new BadHttpRequestException(_tournamentAlreadyFinishedException);
            }

            var currentRound = tournament.Rounds
                .Where(r => r.Matches.Any(m => m.Id == request.MatchId))
                .First();

            var currentMatch = currentRound.Matches
                .Where(m => m.Id == request.MatchId)
                .First();

            if (currentMatch.WinnerTeam is not null)
            {
                throw new BadHttpRequestException(_matchAlreadyFinishedException);
            }

            currentMatch.Team1Score = request.Team1Score;
            currentMatch.Team2Score = request.Team2Score;

            var winnerTeam = GetWinnerTeam(currentMatch);

            currentMatch.WinnerTeam = winnerTeam;

            if (currentMatch.Round.Type != RoundType.Finals)
            {
                int nextMatchIndex = currentMatch.Index / 2;
                bool isScoreForNextTeam1 = currentMatch.Index % 2 == 0;

                var nextRound = tournament.Rounds
                    .Where(r => r.Number == (currentRound.Number + 1))
                    .First();

                var nextMatch = nextRound.Matches
                    .Where(m => m.Index == nextMatchIndex)
                    .First();

                if (isScoreForNextTeam1)
                {
                    nextMatch.Team1 = currentMatch.WinnerTeam;
                }
                else
                {
                    nextMatch.Team2 = currentMatch.WinnerTeam;
                }

                if (nextMatch.Team1 is not null && nextMatch.Team2 is not null)
                {
                    nextMatch.AreTeamsDrawn = true;
                }
            }
            else
            {
                tournament.WinnerTeam = winnerTeam;
                tournament.HasFinished = true;
                tournament.EndDate = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync(cancellationToken);

            return new Result();
        }

        private static Team GetWinnerTeam(Match match)
        {
            Team winner;

            if (match.Team1Score > match.Team2Score)
            {
                winner = match.Team1!;
            }
            else
            {
                winner = match.Team2!;
            }

            return winner;
        }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(c => c.TournamentId).GreaterThan(0);
            RuleFor(c => c.MatchId).GreaterThan(0);
            RuleFor(c => c.Team1Score).InclusiveBetween(0, 3);
            RuleFor(c => c.Team2Score).InclusiveBetween(0, 3);
            RuleFor(c => c).Must(c =>
                c.Team1Score is 3 ?
                    c.Team2Score is not 3 :
                    c.Team2Score is 3)
                .WithMessage("One team must have the score 3.");
        }
    }
}
