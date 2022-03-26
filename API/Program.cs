using API.Extensions;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var currentAssembly = Assembly.GetExecutingAssembly();

ApplicationServicesExtensions.AddApplicationServices(builder.Services, builder.Configuration, currentAssembly);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
