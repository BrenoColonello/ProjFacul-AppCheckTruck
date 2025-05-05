using transportadores.dominio.entidades;
using transportadores.infra;

namespace transportadores.servicos;

public class ServicoCrud<T>(Context dbContext) : ServicoConsulta<T>(dbContext) where T : EntidadeBase
{
    public virtual bool Adicionar(T entidade)
    {
        dbContext.Set<T>().Add(entidade);
        var res = dbContext.SaveChanges();
        return res > 0;
    }
    
    public virtual T Atualizar(T entidade)
    {
        dbContext.Set<T>().Update(entidade);
        dbContext.SaveChanges();
        return entidade;
    }

    public virtual T? Deletar(int id)
    {
        var entidade = dbContext.Set<T>().FirstOrDefault(e => e.Id == id);
        if (entidade is null)
        {
            return null;
        }
        dbContext.Set<T>().Remove(entidade);
        dbContext.SaveChanges();
        return entidade;
    }
}