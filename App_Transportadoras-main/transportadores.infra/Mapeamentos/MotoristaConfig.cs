using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using transportadores.dominio.entidades;

namespace transportadores.infra.Mapeamentos;

public class MotoristaConfig : IEntityTypeConfiguration<Motorista>
{
    public void Configure(EntityTypeBuilder<Motorista> builder)
    {
        builder.HasKey(m => m.Id);
        builder.HasMany(c => c.Despesas)
            .WithOne()
            .HasForeignKey(d => d.MotoristaId)
            .IsRequired();

        builder.HasOne(m => m.Veiculo)
            .WithOne(v => v.Motorista)
            .HasForeignKey<Veiculo>(v => v.MotoristaId)
            .IsRequired();
    }
}