using API.ApiResponses;
using API.Data;
using API.Domain;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json.Serialization;

namespace API.Features.Players;

public class AddPlayer
{
    public class Command : IRequest<Result>
    {
        [JsonIgnore]
        public int TeamId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public int PositionId { get; set; }
    }

    public class Result
    {
        public PlayerDetailsDto CreatedPlayer { get; init; } = new PlayerDetailsDto();
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly ApiDbContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public Handler(ApiDbContext context, IMapper mapper, UserManager<AppUser> userManager, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var email = _userAccessor.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            var player = _mapper.Map<Player>(request);
            player.TeamId = request.TeamId;
            player.PositionId = request.PositionId;

            bool teamExists = await _context.Teams.AnyAsync(t => t.Id == request.TeamId && t.OrganizerId == user.Id, cancellationToken);

            if (!teamExists)
            {
                throw new ApiObjectNotFoundException($"No team with ID: {request.TeamId}");
            }
            bool positionExist = await _context.Positions.AnyAsync(t => t.Id == request.PositionId, cancellationToken);

            if (!positionExist)
            {
                throw new ApiObjectNotFoundException($"No position with ID: {request.PositionId}");
            }

            _context.Players.Add(player);

            await _context.SaveChangesAsync(cancellationToken);

            var position = await _context.Positions.FirstOrDefaultAsync(p => p.Id == request.PositionId, cancellationToken);
            player.Position = position!;
            var playerToReturn = _mapper.Map<PlayerDetailsDto>(player);

            return new Result { CreatedPlayer = playerToReturn };
        }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MinimumLength(3);
            RuleFor(c => c.Surname).NotEmpty().MinimumLength(3);
        }
    }
}
