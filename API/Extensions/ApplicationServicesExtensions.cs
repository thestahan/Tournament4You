using API.Behaviors;
using API.Data;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace API.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config, Assembly assembly)
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
        });

        services.AddAutoMapper(assembly);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddValidatorsFromAssembly(currentAssembly);
        services.AddDbContext<ApiDbContext>(opt => opt.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Tournament4YouDB;Trusted_Connection=True;MultipleActiveResultSets=true"));

        return services;
    }
}
