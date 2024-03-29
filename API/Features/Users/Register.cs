﻿using API.CustomValidators;
using API.Domain;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace API.Features.Users;

public class Register
{
    public record Command : IRequest<Result>
    {
        public string Email { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }

    public record Result
    {
        public string Email { get; init; } = string.Empty;
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

            if (emailExists)
            {
                throw new BadHttpRequestException("Email address is in use.");
            }

            var user = _mapper.Map<AppUser>(request);

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new BadHttpRequestException("Couldn't create an account.");
            }

            return new Result { Email = request.Email };
        }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(c => c.Email).NotEmpty().EmailAddress();
            RuleFor(c => c.Password).NotEmpty().MinimumLength(8);
            RuleFor(c => c.FirstName).NotEmpty().AllowOnlyLetters();
            RuleFor(c => c.LastName).NotEmpty().NotEqual(c => c.FirstName).WithMessage("'{PropertyName}' should be different from the first name").AllowOnlyLetters();
        }
    }
}
