using API.Domain;
using AutoMapper;

namespace API.Features.Positions;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Position, List.Result.Position>();
    }
}
