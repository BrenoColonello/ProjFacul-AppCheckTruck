using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using transportadores.dominio.entidades;

namespace transportadores.infra.Mapeamentos;

public class DespesaConfig : IEntityTypeConfiguration<Despesa>
{
    public void Configure(EntityTypeBuilder<Despesa> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasOne<Veiculo>()
            .WithMany()
            .HasForeignKey(d => d.VeiculoId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
    }
}