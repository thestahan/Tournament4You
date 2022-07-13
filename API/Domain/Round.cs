namespace API.Domain;

public class Round
{
    public int Id { get; set; }
    public int Number { get; set; }
    public ICollection<Match> Matches { get; set; } = new List<Match>();
    public RoundType Type { get; set; }
    public Tournament Tournament { get; set; } = default!;
    public int TournamentId { get; set; }
}

public enum RoundType
{
    EighthFinals,
    QuarterFinals,
    SemiFinals,
    Finals
}
