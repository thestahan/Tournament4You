using API.Data;
using API.Domain;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Teams;

public class List
{
    public record Query : IRequest<Result>
    {
    }

    public record Result
    {
        public List<Team> Teams { get; init; } = new List<Team>();

        public class Team
        {
            public int Id { get; init; }
            public string Name { get; init; } = default!;
            public string City { get; init; } = default!;
            public string Coach { get; init; } = default!;
        }
    }

    public class Handler : IRequestHandler<Query, Result>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(UserManager<AppUser> userManager, ApiDbContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = _userAccessor.User;

            var userAccount = await _userManager.FindByEmailAsync(user.FindFirstValue(ClaimTypes.Email));

            var teams = await _context.Teams
                .Where(t => t.OrganizerId == userAccount.Id)
                .ProjectTo<Result.Team>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new Result { Teams = teams };
        }
    }
}
