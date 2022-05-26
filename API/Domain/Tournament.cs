namespace API.Domain;

public class Tournament
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
    public DateTime? EndDate { get; set; }
    public bool HasStarted { get; set; }
    public bool HasFinished { get; set; }
    public string OrganizerId { get; set; } = string.Empty;
    public AppUser Organizer { get; set; } = default!;
    public Team? WinnerTeam { get; set; }
    public ICollection<Team> Teams { get; set; } = new List<Team>();
    public ICollection<Match> Matches { get; set; } = new List<Match>();
}
