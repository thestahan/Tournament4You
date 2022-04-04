﻿namespace API.Domain;

public class Team
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? City { get; set; }
    public string? Coach { get; set; }
    public ICollection<Tournament> Tournaments { get; set; } = new List<Tournament>();
    public ICollection<Player> Players { get; set; } = new List<Player>();
}
