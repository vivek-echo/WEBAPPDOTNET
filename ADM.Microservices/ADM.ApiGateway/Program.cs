using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Json;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ Serilog logging for Gateway
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File(
        path: "Logs/Gateway_.json",
        rollingInterval: RollingInterval.Day,
        restrictedToMinimumLevel: LogEventLevel.Information,
        formatter: new JsonFormatter()
    )
    .CreateLogger();

builder.Host.UseSerilog();

// 2️⃣ Load ocelot.json
builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// 3️⃣ CORS (if you want to allow your Angular app)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200") // Angular dev URL
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// 4️⃣ Ocelot
builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

// (Later we will add UseAuthentication() / UseAuthorization())

await app.UseOcelot();

app.Run();
