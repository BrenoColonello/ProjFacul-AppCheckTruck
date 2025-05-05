using Microsoft.EntityFrameworkCore;
using transportadores.dominio.entidades;
using transportadores.infra;

namespace transportadores.servicos;

public class ServicoMotorista(Context context) : ServicoCrud<Motorista>(context)
{
    public Motorista? AdicionarDespesa(Despesa despesa)
    {
        var motorista = RetornarPorId(despesa.MotoristaId);
        if (motorista is null)
        {
            return null;
        }

        despesa.VeiculoId = motorista.Veiculo.Id;
        motorista.Despesas.Add(despesa);
        var motoristaAtualizado = Atualizar(motorista);
        return motoristaAtualizado;
    }

    public List<Despesa> RetornarDespesas(int idMotorista)
    {
        var motorista = dbContext.Set<Motorista>()
            .Where(m => m.Id == idMotorista)
            .Include(m => m.Despesas)
            .FirstOrDefault();

        if (motorista is null)
        {
            return new List<Despesa>();
        }
        
        return motorista.Despesas.ToList();
    }

    public Despesa? RetornarDespesa(int idMotorista, int idDespesa)
    {
        var motorista = RetornarPorId(idMotorista);
        if (motorista is null)
        {
            return null;
        }
        var despesa = motorista.Despesas.FirstOrDefault(d => d.Id == idDespesa);
        return despesa;
    }

    public Motorista? AdicionarDespesa(int idMotorista, Despesa despesa)
    {
        var motorista = RetornarPorId(idMotorista);
        if (motorista is null)
        {
            return null;
        }
        
        despesa.VeiculoId = motorista.Veiculo.Id;
        motorista.Despesas.Add(despesa);
        var motoristaAtualizado = Atualizar(motorista);
        
        return motoristaAtualizado;
    }
}