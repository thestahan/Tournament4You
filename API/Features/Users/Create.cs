using API.Data;
using API.Domain;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace API.Features.Users;

public class Create
{
    public class Command : IRequest<Result>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class Result
    {
        public string Email { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public Handler(UserManager<AppUser> userManager,
                       IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            bool emailExists = await _userManager.FindByEmailAsync(request.Email) != null;

            if (emailExists) throw new BadHttpRequestException("Email address is in use.");

            var user = _mapper.Map<AppUser>(request);

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded) throw new BadHttpRequestException("Couldn't create an account.");

            return new Result { Email = request.Email };
        }
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
