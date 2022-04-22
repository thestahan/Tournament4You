using API.Data;
using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

ApplicationServicesExtensions.AddApplicationServices(builder.Services, builder.Configuration);

IdentityServiceExtensions.AddIdentityServices(builder.Services, builder.Configuration);

var app = builder.Build();

await DbContextHelpers.UpdateDatabase(app);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
