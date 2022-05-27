using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Tournaments;

public class Delete
{
    public class Command : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public class Result
    {
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly ApiDbContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly UserManager<AppUser> _userManager;

        public Handler(ApiDbContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
        {
            _context = context;
            _userAccessor = userAccessor;
            _userManager = userManager;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            string email = _userAccessor.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            var tournament = await _context.Tournaments
                .Where(t => t.Id == request.Id && t.OrganizerId == user.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (tournament is null)
            {
                throw new ApiObjectNotFoundException($"Tournament of given Id has not beed found.");
            }

            _context.Tournaments.Remove(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return new Result();
        }
    }
}
