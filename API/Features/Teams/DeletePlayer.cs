using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Teams;

public class DeletePlayer
{
    public record Command : IRequest<Result>
    {
        public int TeamId { get; init; }
        public int PlayerId { get; init; }
    }

    public record Result
    {
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly ApiDbContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly UserManager<AppUser> _userManager;

        public Handler(UserManager<AppUser> userManager,
                       IUserAccessor userAccessor,
                       ApiDbContext context)
        {
            _userManager = userManager;
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            string email = _userAccessor.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            var player = await _context.Players
                .Where(p => p.Id == request.PlayerId
                            && p.Team.Id == request.TeamId
                            && p.Team.OrganizerId == user.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (player is null)
            {
                throw new ApiObjectNotFoundException
                    ($"No player with id: {request.PlayerId} found for team with id: {request.TeamId}");
            }

            _context.Players.Remove(player);
            await _context.SaveChangesAsync(cancellationToken);

            return new Result();
        }
    }
}
