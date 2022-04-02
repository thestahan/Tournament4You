using API.Domain;
using API.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace API.Features.Users;

public class Login
{
    public record Command : IRequest<Result>
    {
        public string Email { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
    }

    public record Result
    {
        public string Email { get; init; } = string.Empty;
        public string Token { get; init; } = string.Empty;
        public string TokenExpiration { get; init; } = string.Empty;
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        public Handler(UserManager<AppUser> userManager,
                       ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user is null)
            {
                throw new BadHttpRequestException("Login credentials are invalid.");
            }

            var result = await _userManager.CheckPasswordAsync(user, request.Password);

            if (result is false)
            {
                throw new BadHttpRequestException("Login credentials are invalid.");
            }

            var jwt = _tokenService.CreateToken(user);

            return new Result
            {
                Email = request.Email,
                Token = jwt,
                TokenExpiration = "86400"
            };
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.Email).NotEmpty().EmailAddress();
                RuleFor(c => c.Password).NotEmpty().MinimumLength(8);
            }
        }
    }
}
