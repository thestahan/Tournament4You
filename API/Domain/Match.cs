namespace API.Domain;

public class Match
{
    public int Id { get; set; }
    public int Index { get; set; }
    public bool AreTeamsDrawn { get; set; }
    public int? Team1Score { get; set; }
    public int? Team2Score { get; set; }
    public Team? WinnerTeam { get; set; }
    public int? WinnerTeamId { get; set; }
    public Team? Team1 { get; set; }
    public int? Team1Id { get; set; }
    public Team? Team2 { get; set; }
    public int? Team2Id { get; set; }
    public Round Round { get; set; } = default!;
    public int RoundId { get; set; }
}
