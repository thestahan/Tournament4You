using API.Data;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Features.Positions;

public class List
{
    public record Query : IRequest<Result>
    {
    }

    public class Result
    {
        public List<Position> Positions { get; init; } = new List<Position>();

        public class Position
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string Abbreviation { get; set; } = string.Empty;
        }
    }

    public class Handler : IRequestHandler<Query, Result>
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;

        public Handler(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result> Handle(Query request, CancellationToken cancellationToken)
        {
            var positions = await _context.Positions
                .ProjectTo<Result.Position>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new Result { Positions = positions };
        }
    }
}
