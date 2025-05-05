using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using transportadores.dominio.entidades;

namespace transportadores.infra.Mapeamentos;

public class TipoPecaConfig : IEntityTypeConfiguration<TipoPeca>
{
    public void Configure(EntityTypeBuilder<TipoPeca> builder)
    {
        builder.HasKey(t => t.Id);
        builder.HasMany<Peca>(t => t.PecasRegistradas)
            .WithOne(p => p.TipoPeca);
    }
}