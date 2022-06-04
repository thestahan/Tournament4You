using API.ApiResponses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Tournaments;

[Authorize]
public class TournamentsController : BaseApiController
{
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Add.Result))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
    public async Task<ActionResult<Add.Result>> Add(Add.Command command)
    {
        var result = await Mediator.Send(command);

        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetById.Result))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ApiResponse))]
    public async Task<ActionResult<GetById.Result>> GetById(int id)
    {
        var result = await Mediator.Send(new GetById.Query { Id = id });

        return Ok(result);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List.Result))]
    public async Task<ActionResult<List.Result>> List()
    {
        var result = await Mediator.Send(new List.Query());

        return Ok(result);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent, Type = typeof(Delete.Result))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ApiResponse))]
    public async Task<ActionResult> Delete(int id)
    {
        await Mediator.Send(new Delete.Command { Id = id });

        return NoContent();
    }

    [HttpPatch("{id}/start")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Start.Result))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ApiResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
    public async Task<ActionResult<Start.Result>> Start(int id)
    {
        var startedTournament = await Mediator.Send(new Start.Command { Id = id });

        return startedTournament;
    }
}
