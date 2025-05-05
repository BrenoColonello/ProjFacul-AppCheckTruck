using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using transportadores.dominio.entidades;

namespace transportadores.infra.Mapeamentos;

public class PecaConfig : IEntityTypeConfiguration<Peca>
{
    public void Configure(EntityTypeBuilder<Peca> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.HasOne(p => p.TipoPeca)
            .WithMany(t => t.PecasRegistradas)
            .HasForeignKey(p => p.TipoPecaId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();
    }
}