using System.Linq.Expressions;
using transportadores.dominio.entidades;
using transportadores.infra;

namespace transportadores.servicos;

public class ServicoConsulta<T>(Context dbContext)
    where T : EntidadeBase
{
    protected readonly Context dbContext = dbContext;

    public virtual T? RetornarPorId(int id)
    {
        return dbContext.Set<T>().FirstOrDefault(e => e.Id == id);
    }

    public virtual List<T> RetornarTodos()
    {
        return dbContext.Set<T>().ToList();
    }

    public virtual List<T> RetornarTodos(Expression<Func<T, bool>> predicate)
    {
        return dbContext.Set<T>().Where(predicate).ToList();
    }
}