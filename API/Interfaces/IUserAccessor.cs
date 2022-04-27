using System.Security.Claims;

namespace API.Interfaces;

public interface IUserAccessor
{
    ClaimsPrincipal User { get; }
}
