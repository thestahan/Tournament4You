using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Dtos.Matches;
using API.Dtos.Teams;
using API.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Tournaments;

public class Start
{
    public record Command : IRequest<Result>
    {
        public int TournamentId { get; set; }
    }

    public record Result
    {
        public int Id { get; init; }
        public string Name { get; init; } = default!;
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime? EndDate { get; set; }
        public bool HasStarted { get; set; }
        public bool HasFinished { get; set; }
        public TeamSimpleDto? WinnerTeam { get; set; }
        public ICollection<TeamSimpleDto> Teams { get; set; } = new List<TeamSimpleDto>();
        public ICollection<MatchDto> Matches { get; set; } = new List<MatchDto>();
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        private const string _tournamentAlreadyStartedException =
            "The tournament has already started.";

        public Handler(IMapper mapper,
                       ApiDbContext context,
                       IUserAccessor userAccessor,
                       UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _context = context;
            _userAccessor = userAccessor;
            _userManager = userManager;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = _userAccessor.User;
            var userAccount = await _userManager.FindByEmailAsync(user.FindFirstValue(ClaimTypes.Email));
            var tournament = await _context.Tournaments
                .Where(t => t.Id == request.TournamentId && t.OrganizerId == userAccount.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (tournament is null)
            {
                throw new ApiObjectNotFoundException(_tournamentAlreadyStartedException);
            }

            throw new NotImplementedException();
        }
    }
}
