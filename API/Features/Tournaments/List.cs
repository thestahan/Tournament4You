using API.Data;
using API.Domain;
using API.Dtos.Teams;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Tournaments;

public class List
{
    public record Query : IRequest<Result>
    {
    }

    public record Result
    {
        public ICollection<TournamentDto> Tournaments { get; set; } = new List<TournamentDto>();

        public class TournamentDto
        {
            public int Id { get; init; }
            public string Name { get; init; } = default!;
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public bool HasStarted { get; set; }
            public bool HasFinished { get; set; }
            public TeamSimpleDto? WinnerTeam { get; set; }
        }
    }

    public class Handler : IRequestHandler<Query, Result>
    {
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

        public async Task<Result> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = _userAccessor.User;
            var userAccount = await _userManager.FindByEmailAsync(user.FindFirstValue(ClaimTypes.Email));

            var tournaments = await _context.Tournaments
                .Where(t => t.OrganizerId == userAccount.Id)
                .ProjectTo<Result.TournamentDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new Result { Tournaments = tournaments };
        }
    }
}
