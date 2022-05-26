using API.Domain;
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
        CreateMap<Match, GetById.Result.MatchDto>();
        CreateMap<Team, GetById.Result.TeamDto>();
    }
}
