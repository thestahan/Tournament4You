using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Teams;

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
            var email = _userAccessor.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            var team = await _context.Teams.FirstOrDefaultAsync(t => t.Id == request.Id && t.OrganizerId == user.Id, cancellationToken);

            if (team is null)
            {
                throw new ApiObjectNotFoundException($"No team with ID: {request.Id}");
            }

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync(cancellationToken);

            return new Result();
        }
    }
}
