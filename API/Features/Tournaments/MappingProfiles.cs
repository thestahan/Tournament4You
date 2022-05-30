using API.Domain;
using API.Dtos.Matches;
using API.Dtos.Teams;
using AutoMapper;

namespace API.Features.Tournaments;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Add.Command, Tournament>();
        CreateMap<Tournament, Add.Result>();
        CreateMap<Team, Add.Result.Team>();

        CreateMap<Tournament, GetById.Result>();
        CreateMap<Match, MatchDto>();
        CreateMap<Team, TeamSimpleDto>();

        CreateMap<Tournament, Start.Result>();
    }
}
