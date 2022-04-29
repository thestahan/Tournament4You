namespace API.ApiResponses;

public class ApiObjectNotFoundException : Exception
{
    public ApiObjectNotFoundException(string? message = null) : base(message)
    {
    }
}
