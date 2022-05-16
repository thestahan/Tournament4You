using API.ApiResponses;
using Newtonsoft.Json;
using System.Net;

namespace API.Middleware;

public class ExceptionMiddleware
{
    private const string _unhandledExeptionMessage = "An unhandled exception occured.";
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception error)
        {
            ApiExceptionResponse response;
            context.Response.ContentType = "application/json";

            switch (error)
            {
                case ApiObjectNotFoundException ex:
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    response = new ApiExceptionResponse(404, ex.Message);
                    break;
                default:
                    _logger.LogError(error, _unhandledExeptionMessage);
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    response = GetExceptionForInternalError(error, _env.IsDevelopment());
                    break;
            }

            var settings = new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore };

            string json = JsonConvert.SerializeObject(response, Formatting.None, settings);

            await context.Response.WriteAsync(json);
        }
    }

    private static ApiExceptionResponse GetExceptionForInternalError(Exception ex, bool isDevelopment) =>
        isDevelopment
            ? new ApiExceptionResponse((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace!.ToString())
            : new ApiExceptionResponse((int)HttpStatusCode.InternalServerError);

}
