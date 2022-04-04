namespace API.Domain;

public class Match
{
    public int Id { get; set; }
    public int Team1Score { get; set; }
    public int Team2Score { get; set; } 
    public Tournament Tournament { get; set; }
    public Team WinnerTeam { get; set; }
    public Team Team1 { get; set; }
    public Team Team2 { get; set; }
}
