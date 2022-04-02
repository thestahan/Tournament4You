using API.ApiResponses;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Users;

public class UsersController : BaseApiController
{
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Create.Result))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
    public async Task<ActionResult<Create.Result>> Create(Create.Command command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Login.Result))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
    public async Task<ActionResult<Login.Result>> Login(Login.Command command)
    {
        var result = await Mediator.Send(command);

        return Ok(result);
    }
}
