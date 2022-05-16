namespace API.Domain;

public class Player
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public Team Team { get; set; } = default!;
    public int TeamId { get; set; }
    public Position Position { get; set; } = default!;
    public int PositionId { get; set; }
}
