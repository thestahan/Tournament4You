using API.ApiResponses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Users;

[Authorize]
public class UsersController : BaseApiController
{
    [HttpPost("register")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Register.Result))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
    public async Task<ActionResult<Register.Result>> Create(Register.Command command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Login.Result))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
    public async Task<ActionResult<Login.Result>> Login(Login.Command command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }

    [HttpPatch("Update")]
    public async Task<ActionResult<Update.Result>> Update(Update.Command command)
    {
        await Mediator.Send(command);

        return NoContent();
    }

    private ActionResult<Update.Result> BadHttpRequestException(string v)
    {
        throw new NotImplementedException();
    }
}
