using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Dtos.Players;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Teams;

public class GetById
{
    public record Query : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public record Result
    {
        public int Id { get; init; }
        public string Name { get; init; } = default!;
        public string City { get; init; } = default!;
        public string Coach { get; init; } = default!;
        public List<PlayerDetailsDto> Players { get; init; } = new List<PlayerDetailsDto>();
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

            var team = await _context.Teams
                .Include(t => t.Players)
                .ThenInclude(p => p.Position)
                .Where(t => t.Id == request.Id && t.OrganizerId == userAccount.Id)
                .ProjectTo<Result>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(cancellationToken);

            if (team is null)
            {
                throw new ApiObjectNotFoundException("Team of given id was not found");
            }

            return team;
        }
    }
}
