using API.Domain.Common;
using API.Helpers;

namespace API.Domain;

public class Tournament
{
    private static readonly List<int> _supportedTeamsCounts = new()
    {
        2, 4, 8, 16, 32
    };

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

    public CommandResult Start()
    {
        if (HasStarted)
        {
            return new CommandResult(
                Status.Fail,
                "The tournament has already started");
        }

        if (!_supportedTeamsCounts.Contains(Teams.Count))
        {
            return new CommandResult(
                Status.Fail,
                "Starting tournament with given teams count is not currently supported. " +
                "Teams number should be equal to one of: " +
                string.Join(',', _supportedTeamsCounts));
        }

        ShuffleTeams();

        int roundsCount = NumberHelpers.GetTheAmountOfTimesIntCanBeDividedByN(Teams.Count, 2);

        for (int i = 0; i < roundsCount; i++)
        {

        }

        return new CommandResult(Status.Success);
    }

    private void ShuffleTeams()
    {
        var rng = new Random();

        Teams = Teams.OrderBy(t => rng.Next()).ToList();
    }
}
