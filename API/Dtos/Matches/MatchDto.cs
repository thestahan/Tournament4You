using API.Dtos.Teams;

namespace API.Dtos.Matches;

public class MatchDto
{
    public int Id { get; set; }
    public int Index { get; set; }
    public int RoundNumber { get; set; }
    public int Team1Score { get; set; }
    public int Team2Score { get; set; }
    public TeamSimpleDto? WinnerTeam { get; set; }
    public TeamSimpleDto? Team1 { get; set; } = default!;
    public TeamSimpleDto? Team2 { get; set; } = default!;
}
