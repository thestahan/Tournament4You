using API.Domain;
using API.Dtos.Matches;
using API.Dtos.Rounds;
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
        //.ForMember(
        //    dest => dest.Team1Name,
        //    opt => opt.MapFrom(src => GetTeamNameIfTeamExists(src.Team1)))
        //.ForMember(
        //    dest => dest.Team2Name,
        //    opt => opt.MapFrom(src => GetTeamNameIfTeamExists(src.Team2)));
        CreateMap<Team, TeamSimpleDto>();

        CreateMap<Tournament, Start.Result>();
        CreateMap<Round, RoundDto>();
    }

    private static string? GetTeamNameIfTeamExists(Team? team) =>
        team?.Name;
}
