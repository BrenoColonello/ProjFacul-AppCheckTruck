using Microsoft.EntityFrameworkCore;

namespace transportadores.infra;

public class Context(DbContextOptions options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly);
    }
};