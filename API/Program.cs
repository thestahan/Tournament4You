using API.Data;
using API.Extensions;

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

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
