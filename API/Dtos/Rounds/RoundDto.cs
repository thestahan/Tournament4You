using API.Dtos.Matches;

namespace API.Dtos.Rounds;

public class RoundDto
{
    public int Number { get; set; }
    public string Type { get; set; } = string.Empty;
    public ICollection<MatchDto> Matches { get; set; } = new List<MatchDto>();
}
