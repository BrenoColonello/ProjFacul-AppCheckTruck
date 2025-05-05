

namespace transportadores.dominio.entidades;

public class Veiculo : EntidadeBase
{
    public string Placa { get; set; }
    public float Quilometragem { get; set; }
    public List<Peca> Pecas { get; set; }
    public string Chassi { get; set; }
    public Motorista? Motorista { get; set; }
    public int MotoristaId { get; set; }
    
}