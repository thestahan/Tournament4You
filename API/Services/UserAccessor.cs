using API.Interfaces;
using System.Security.Claims;

namespace API.Services;

public class UserAccessor : IUserAccessor
{
    private readonly IHttpContextAccessor _contextAccessor;

    public UserAccessor(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor ?? throw new ArgumentNullException(nameof(contextAccessor));
    }

    public ClaimsPrincipal User => _contextAccessor.HttpContext!.User;
}
