

namespace transportadores.dominio.entidades;

public class Peca : EntidadeBase
{
    public DateTime UltimaManutenção { get; set; } = DateTime.Now;
    public string Nome { get; set; }
    public float QuilometragemUltimaManutencao { get; set; }
    public float QuilometragemProximaManutencao { get; set; }
    public DateTime DataProximaManutencao { get; set; }
    
    public TipoPeca TipoPeca { get; set; }
    public int TipoPecaId { get; set; }

    public int VeiculoId { get; set; }
    
}