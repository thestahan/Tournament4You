using API.Data;
using API.Domain;
using API.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Tournaments;

public class Add
{
    public record Command : IRequest<Result>
    {
        public string Name { get; set; } = string.Empty;
        public List<int> TeamsIds { get; set; } = new List<int>();
    }

    public record Result
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool HasStarted { get; set; }
        public bool HasFinished { get; set; }
        public ICollection<Team> Teams { get; set; } = new List<Team>();

        public class Team
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
        }
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private const string _teamNotFoundException = "At least one team of given ids was not found.";

        private readonly UserManager<AppUser> _userManager;
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

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
            var tournament = _mapper.Map<Tournament>(request);

            tournament.OrganizerId = userAccount.Id;

            _context.Add(tournament);

            if (request.TeamsIds.Count > 0)
            {
                await ValidateSuppiledTeamsIds(request.TeamsIds, userAccount.Id, cancellationToken);

                tournament.Teams = await _context.Teams
                    .Where(t => t.OrganizerId == userAccount.Id
                                && request.TeamsIds.Contains(t.Id))
                    .ToListAsync(cancellationToken);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<Result>(tournament);
        }

        private async Task ValidateSuppiledTeamsIds(IList<int> teamsIds, string userId, CancellationToken cancellationToken)
        {
            var usersTeamsIds = await _context.Teams
                            .Where(t => t.OrganizerId == userId)
                            .Select(t => t.Id)
                            .ToListAsync(cancellationToken);

            bool teamsExistAndBelongToUser = teamsIds.All(id => usersTeamsIds.Contains(id));

            if (!teamsExistAndBelongToUser)
            {
                throw new BadHttpRequestException(_teamNotFoundException);
            }
        }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MinimumLength(3);
        }
    }
}
