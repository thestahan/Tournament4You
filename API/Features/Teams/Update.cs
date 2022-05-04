using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json.Serialization;

namespace API.Features.Teams;

public class Update
{
    public record Command : IRequest<Result>
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Name { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string Coach { get; init; } = string.Empty;
    }

    public record Result
    {
    }

    public class Hander : IRequestHandler<Command, Result>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApiDbContext _context;
        private readonly IUserAccessor _userAccessor;

        public Hander(ApiDbContext context,
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

            var team = await _context.Teams
                .FirstOrDefaultAsync(t => t.Id == request.Id && t.OrganizerId == userAccount.Id, cancellationToken);

            if (team is null)
            {
                throw new ApiObjectNotFoundException("Team of given id was not found.");
            }

            team.Name = request.Name;
            team.City = request.City;
            team.Coach = request.Coach;

            return new Result();
        }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(c => c.Id).NotNull().GreaterThan(0);
            RuleFor(c => c.Name).NotEmpty().MinimumLength(3);
            RuleFor(c => c.City).NotEmpty();
            RuleFor(c => c.Coach).NotEmpty().MinimumLength(2);
        }
    }
}
