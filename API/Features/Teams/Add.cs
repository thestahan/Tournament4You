using API.Data;
using API.Domain;
using AutoMapper;
using FluentValidation;
using MediatR;

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
        public int Id { get; set; }
        public string Name { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string Coach { get; init; } = string.Empty;
    }

    public class Handler : IRequestHandler<Command, Result>
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;

        public Handler(IMapper mapper, ApiDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var team = _mapper.Map<Team>(request);

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
