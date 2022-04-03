namespace API.Domain
{
    public class Tournament
    {
        public int Id { get; set; }
        public string? TournamentName { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime? EndDate { get; set; }
        public int TeamCount { get; set; }
        public bool HasFinished { get; set; }
        public AppUser Organizer { get; set; }
        public Team WinnerTeam  { get; set; }
        public ICollection<Match> Matches { get; set; }
    }
}
