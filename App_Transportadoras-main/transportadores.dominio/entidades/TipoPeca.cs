namespace transportadores.dominio.entidades;

public class TipoPeca : EntidadeBase
{
    public string Nome { get; set; }
    public int KilometragemRevisao { get; set; }
    public List<Peca> PecasRegistradas { get; set; } = new List<Peca>();
}