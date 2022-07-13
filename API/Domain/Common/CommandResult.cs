namespace API.Domain.Common;

public class CommandResult
{
    public Status Status { get; private set; }

    public string FailMessage { get; private set; }

    public CommandResult(Status status, string failMessage = "")
    {
        Status = status;
        FailMessage = failMessage;
    }
}

public enum Status
{
    Fail,
    Success
}