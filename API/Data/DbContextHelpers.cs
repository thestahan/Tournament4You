using Microsoft.EntityFrameworkCore;

namespace API.Data;

public static class DbContextHelpers
{
    public static async Task UpdateDatabase(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApiDbContext>();
        await context.Database.MigrateAsync();
    }
}
