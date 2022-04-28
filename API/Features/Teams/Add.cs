using API.Data;
using API.Domain;
using API.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Features.Teams;

public class Add
{
    public record Command : IRequest<Result>
    {
        public string Name { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string Coach { get; init; } = string.Empty;
    }

    public record Result
    {
        public int Id { get; init; }
        public string Name { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string Coach { get; init; } = string.Empty;
    }

    public class Handler : IRequestHandler<Command, Result>
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

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = _userAccessor.User;

            var userAccount = await _userManager.FindByEmailAsync(user.FindFirstValue(ClaimTypes.Email));

            var team = _mapper.Map<Team>(request);

            team.OrganizerId = userAccount.Id;

            _context.Add(team);

            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<Result>(team);
        }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MinimumLength(3);
            RuleFor(c => c.City).NotEmpty();
            RuleFor(c => c.Coach).NotEmpty().MinimumLength(2);
        }
    }
}
