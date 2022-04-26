using API.ApiResponses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Teams;

[Authorize]
public class TournamentsController : BaseApiController
{
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Add.Result))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
    public async Task<ActionResult<Add.Result>> Add(Add.Command command)
    {
        var result = await Mediator.Send(command);

        return CreatedAtRoute(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById()
    {
        throw new NotImplementedException();
    }
}
