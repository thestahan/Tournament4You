using API.Domain;
using AutoMapper;

namespace API.Features.Teams;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Add.Command, Team>();
        CreateMap<Team, Add.Result>();

        CreateMap<Team, GetById.Result>();
    }
}
