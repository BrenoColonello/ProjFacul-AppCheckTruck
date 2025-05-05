using System.ComponentModel.DataAnnotations;

namespace transportadores.dominio.entidades;

public class Despesa : EntidadeBase
{
    public string Descricao { get; set; }
    public decimal ValorDespesa { get; set; }
    [Required]
    public int MotoristaId { get; set; }
    [Required]
    public int VeiculoId { get; set; }
}