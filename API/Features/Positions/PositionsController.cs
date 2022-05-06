using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Positions;

[Authorize]
public class PositionsController : BaseApiController
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List.Result))]
    public async Task<ActionResult<List.Result>> List()
    {
        var result = await Mediator.Send(new List.Query());

        return Ok(result);
    }
}
