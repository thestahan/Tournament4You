﻿using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Dtos.Matches;
using API.Dtos.Teams;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Features.Tournaments;

public class GetById
{
    public record Query : IRequest<Result>
    {
        public int Id { get; set; }
    }

    public record Result
    {
        public int Id { get; init; }
        public string Name { get; init; } = default!;
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime? EndDate { get; set; }
        public bool HasStarted { get; set; }
        public bool HasFinished { get; set; }
        public TeamSimpleDto? WinnerTeam { get; set; }
        public ICollection<TeamSimpleDto> Teams { get; set; } = new List<TeamSimpleDto>();
        public ICollection<MatchDto> Matches { get; set; } = new List<MatchDto>();
    }

    public class Handler : IRequestHandler<Query, Result>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(UserManager<AppUser> userManager, ApiDbContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = _userAccessor.User;
            var userAccount = await _userManager.FindByEmailAsync(user.FindFirstValue(ClaimTypes.Email));

            var tournament = await _context.Tournaments
                .Include(t => t.Teams)
                .Include(t => t.Matches)
                .Where(t => t.Id == request.Id && t.OrganizerId == userAccount.Id)
                .ProjectTo<Result>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(cancellationToken);

            if (tournament is null)
            {
                throw new ApiObjectNotFoundException("Tournament of given id was not found");
            }

            return tournament;
        }
    }
}
