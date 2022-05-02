namespace API.Domain;

public class Position
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Abbreviation { get; set; } = string.Empty;
    public ICollection<Player> Players { get; set; } = new List<Player>();
}
