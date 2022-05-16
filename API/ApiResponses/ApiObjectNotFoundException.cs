namespace API.ApiResponses;

[Serializable]
public class ApiObjectNotFoundException : Exception
{
    public ApiObjectNotFoundException(string? message = null) : base(message)
    {
    }
}
