using System.ComponentModel.DataAnnotations;

namespace transportadores.dominio.entidades;

public class Motorista : EntidadeBase
{
    public string Nome { get; set; }
    public DateTime DataContratacao { get; set; } = DateTime.Now;
    [Required]
    public string Cnh { get; set; }

    public IList<Despesa> Despesas { get; set; }
    public Veiculo? Veiculo { get; set; }
}