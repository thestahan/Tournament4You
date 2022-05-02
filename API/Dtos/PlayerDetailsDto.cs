namespace API.DTOs;

public record PlayerDetailsDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Surname { get; init; } = string.Empty;
    public string Position { get; init; } = string.Empty;
}
