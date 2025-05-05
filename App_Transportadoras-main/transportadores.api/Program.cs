using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using transportadores.dominio.entidades;
using transportadores.infra;
using transportadores.servicos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<Context>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});
builder.Services.AddScoped<ServicoConsulta<Veiculo>>();
builder.Services.AddScoped<ServicoCrud<Veiculo>>();
builder.Services.AddScoped<ServicoVeiculo>();

builder.Services.AddScoped<ServicoConsulta<Motorista>>();
builder.Services.AddScoped<ServicoCrud<Motorista>>();
builder.Services.AddScoped<ServicoMotorista>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();