using API.Domain;
using AutoMapper;

namespace API.Features.Users;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Create.Command, AppUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
    }
}
