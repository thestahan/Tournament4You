using API.Data;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace API.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config, Assembly assembly)
    {
        services.AddControllers().AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssembly(assembly));

        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(cfg =>
        {
            cfg.SwaggerDoc("v1", new OpenApiInfo { Title = "Tournament4You API", Version = "v1" });
        });

        services.AddAutoMapper(assembly);

        services.AddDbContext<ApiDbContext>(opt => opt.UseInMemoryDatabase("Tournament4YouDb").ConfigureWarnings(builder => builder.Ignore(InMemoryEventId.TransactionIgnoredWarning)));

        return services;
    }
}
