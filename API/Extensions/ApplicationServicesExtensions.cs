using API.Behaviors;
using API.Behaviors.Filters;
using API.Data;
using API.Interfaces;
using API.Services;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace API.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        var currentAssembly = Assembly.GetExecutingAssembly();

        services.AddControllers(opt =>
        {
            opt.Filters.Add<FluentValidationExceptionFilter>();
            opt.Filters.Add<BadRequestExceptionFilter>();
        });

        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(cfg =>
        {
            cfg.SwaggerDoc("v1", new OpenApiInfo { Title = "Tournament4You API", Version = "v1" });
            cfg.CustomSchemaIds(type => type.ToString());
        });

        services.AddAutoMapper(currentAssembly);

        services.AddMediatR(currentAssembly);

        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddValidatorsFromAssembly(currentAssembly);

        services.AddDbContext<ApiDbContext>(opt => opt.UseNpgsql("Server=localhost; Port=5432; User Id=appuser; Password=secret; Database=tournament4you"));

        services.AddScoped<ITokenService, TokenService>();

        services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "http://localhost:3001");
            });
        });

        return services;
    }
}
