using API.Behaviors;
using API.Data;
using API.Interfaces;
using API.Services;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace API.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers().AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssembly(assembly));

        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(cfg =>
        {
            cfg.SwaggerDoc("v1", new OpenApiInfo { Title = "Tournament4You API", Version = "v1" });
        });

        services.AddAutoMapper(currentAssembly);

        services.AddMediatR(currentAssembly);

        //services.AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssembly(currentAssembly));

        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddValidatorsFromAssembly(currentAssembly);

        //services.AddTransient<ValidationExceptionHandlingMiddleware>();

        services.AddDbContext<ApiDbContext>(opt => opt.UseInMemoryDatabase("Tournament4YouDb").ConfigureWarnings(builder => builder.Ignore(InMemoryEventId.TransactionIgnoredWarning)));

        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}
