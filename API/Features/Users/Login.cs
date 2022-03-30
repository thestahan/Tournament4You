using API.Domain;
using API.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace API.Features.Users;

public class Login
{
    public class Command : IRequest<Result>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class Result
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string TokenExpiration { get; set; }
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
    }
}
