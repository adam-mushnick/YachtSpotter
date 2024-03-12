using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    //configuring StoreContext to use SQLite as database provider
    //needs connection string to connect efcore to database
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//adding CORS configuration, allow cross origin requests
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//allow cors from this domain origin
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//creates new scope for resolving service dependencies
//services (like dbContext instances) are typically registered with a lifetime (singleton, scoped, transient)
var scope = app.Services.CreateScope();
//throws exception if service can't be found
//obtains instance of StoreContext (my dbcontext)
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
//logs errors regarding Program class
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

//seed database on startup
try
{
    //creates database if it doesn't exist, adds any pending migrations to existing db
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{

    logger.LogError(ex, "A problem occurred during migration");
}

app.Run();
