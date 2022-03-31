using API.ApiResponses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace API.Behaviors;

public class BadRequestExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is BadHttpRequestException ex)
        {
            var errorResponse = new ApiResponse((int)HttpStatusCode.BadRequest, ex.Message);

            context.Result = new BadRequestObjectResult(errorResponse);

            context.ExceptionHandled = true;
        }
    }
}
