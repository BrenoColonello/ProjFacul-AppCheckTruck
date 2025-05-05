using Microsoft.EntityFrameworkCore;
using transportadores.dominio.entidades;
using transportadores.infra;

namespace transportadores.servicos;

public class ServicoVeiculo(Context dbContext) : ServicoCrud<Veiculo>(dbContext)
{
    public List<Peca> RetornarPecas(int id)
    {
        return dbContext.Set<Veiculo>().Include(c => c.Pecas).FirstOrDefault(c => c.Id == id)?.Pecas;
    }
}