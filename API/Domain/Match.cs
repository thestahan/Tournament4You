namespace API.Domain;

public class Match
{
    public int Id { get; set; }
    public int Index { get; set; }
    public int RoundNumber { get; set; }
    public int? Team1Score { get; set; }
    public int? Team2Score { get; set; }
    public Tournament Tournament { get; set; } = default!;
    public int TournamentId { get; set; } = default!;
    public Team? WinnerTeam { get; set; }
    public int? WinnerTeamId { get; set; }
    public Team? Team1 { get; set; }
    public int? Team1Id { get; set; }
    public Team? Team2 { get; set; }
    public int? Team2Id { get; set; }
}

public class Round
{
    public int Id { get; set; }
    public int Number { get; set; }
    public int Matches { get; set; }
    public RoundType Type { get; set; }
}

public enum RoundType
{
    EighthFinals,
    Quarterfinals,
    Semifinals,
    Finals
}
