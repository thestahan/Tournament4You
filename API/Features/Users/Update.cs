using API.CustomValidators;
using API.Domain;
using API.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Features.Users;

public class Update
{

    public class Command : IRequest<Result>
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }

    public class Result
    {

    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserAccessor _userAccessor;

        public Handler(UserManager<AppUser> userManager, IUserAccessor userAccessor)
        {
            _userManager = userManager;
            _userAccessor = userAccessor;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var email = _userAccessor.User.FindFirstValue(ClaimTypes.Email);

            var user = await _userManager.FindByEmailAsync(email);

            if (user is null)
            {
                throw new BadHttpRequestException("NotFound");
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;

            await _userManager.UpdateAsync(user);

            return new Result();
        }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(c => c.FirstName).NotEmpty().AllowOnlyLetters();
            RuleFor(c => c.LastName).NotEmpty().NotEqual(c => c.FirstName).WithMessage("'{PropertyName}' should be different from the first name").AllowOnlyLetters();
        }
    }
}
