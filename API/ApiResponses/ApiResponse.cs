namespace API.ApiResponses;

public class ApiResponse
{
    public int StatusCode { get; set; }

    public string? Message { get; set; }

    public ApiResponse(int statusCode, string? message = null)
    {
        StatusCode = statusCode;
        Message = message ?? GetDefaultMessageForStatusCode(statusCode);
    }

    private static string? GetDefaultMessageForStatusCode(int statusCode)
    {
        return statusCode switch
        {
            400 => "A bad request have been sent.",
            401 => "Authorization have failed.",
            404 => "The resource haven't been found.",
            500 => "A bad thing have happend.",
            _ => null
        };
    }
}
