using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Features;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : Controller
{
    private IMediator? _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
}
