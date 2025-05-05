using Microsoft.AspNetCore.Mvc;
using transportadores.dominio.entidades;
using transportadores.servicos;

namespace transportadores.api.Controllers;

[ApiController, Route("api/[controller]")]
public class MotoristaController : ControllerBase
{
    private readonly ServicoMotorista _servico;

    public MotoristaController(ServicoMotorista servico)
    {
        _servico = servico;
    }

    [HttpGet]
    public IActionResult ListarMotoristas()
    {
        var motoristas = _servico.RetornarTodos();
        return Ok(motoristas);
    }

    [HttpGet("{id:int}")]
    public IActionResult ListarMotorista(int id)
    {
        var motorista = _servico.RetornarPorId(id);
        if (motorista is null)
        {
            return NotFound();
        }

        return Ok(motorista);
    }

    [HttpGet("{idMotorista:int}/despesas/{idDespesa:int}")]
    public IActionResult ObterDespesa(int idMotorista, int idDespesa)
    {
        var despesa = _servico.RetornarDespesa(idMotorista, idDespesa);
        return despesa != null ? Ok(despesa) : NotFound();
    }

    [HttpPost]
    public IActionResult AdicionarMotorista([FromBody] Motorista motorista)
    {
        _servico.Adicionar(motorista);
        return Ok();
    }

    [HttpPut]
    public IActionResult AtualizarMotorista([FromBody] Motorista motorista)
    {
        _servico.Atualizar(motorista);
        return Ok();
    }

    [HttpDelete("")]
    public IActionResult DeletarMotorista([FromQuery] int id)
    {
        var motorista = _servico.Deletar(id);
        if (motorista is null)
        {
            return NotFound();
        }

        return Ok(motorista);
    }

    [HttpPost("{idMotorista:int}/despesas")]
    public IActionResult AdicionarDespesa([FromBody] Despesa despesa, [FromQuery] int idMotorista)
    {
        var motorista = _servico.AdicionarDespesa(idMotorista, despesa);
        return motorista != null ? Ok(motorista) : NotFound();
    }
}