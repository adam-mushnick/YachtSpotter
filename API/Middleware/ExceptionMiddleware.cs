using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware
{
    //initialize variables
    //a delegate that points to the next middleware component in the request pipeline
    private readonly RequestDelegate _next;
    //used to log  any exceptions that occur during request (errors)
    private readonly ILogger<ExceptionMiddleware> _logger;
    //provides info about the web hosting environment
    private readonly IHostEnvironment _env;

//constructor: initializes the fields with the provided arguments
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            //call the next middleaware in the pipeline
            await _next(context);
        }
        catch (Exception ex)
        {
            //catch any exceptions and log, set status code 500
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            //create a response
            var response = new ProblemDetails
            {
                Status = 500,
                Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                Title = ex.Message
            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}