using System.Runtime.InteropServices.ComTypes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using transportadores.dominio.entidades;

namespace transportadores.infra.Mapeamentos;

public class VeiculoConfig : IEntityTypeConfiguration<Veiculo>
{
    public void Configure(EntityTypeBuilder<Veiculo> builder)
    {
        builder.HasKey(v => v.Id);
        builder.HasMany(v => v.Pecas)
            .WithOne()
            .HasForeignKey(p => p.VeiculoId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
    }
}