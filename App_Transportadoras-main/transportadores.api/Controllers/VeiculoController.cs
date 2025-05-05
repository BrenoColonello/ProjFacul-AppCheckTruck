using Microsoft.AspNetCore.Mvc;
using transportadores.dominio.entidades;
using transportadores.servicos;

namespace transportadores.api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class VeiculoController : ControllerBase
{
    private readonly ServicoVeiculo _servico;

    public VeiculoController(ServicoVeiculo servico)
    {
        _servico = servico;
    }
    
    [HttpGet]
    public IActionResult ListarVeiculos()
    {
        return Ok(_servico.RetornarTodos());
    }
    
    [HttpPost]
    public IActionResult AdicionarVeiculo([FromBody]Veiculo veiculo)
    {
        _servico.Adicionar(veiculo);
        return Created();
    }

    [HttpGet("pecas/{id}")]
    public IActionResult ListarPecas(int id)
    {
        var pecas = _servico.RetornarPecas(id);
        
        return Ok(pecas);
    }
    
    [HttpPut]
    public IActionResult AtualizarVeiculo([FromBody]Veiculo veiculo)
    {
        _servico.Atualizar(veiculo);
        return Ok();
    }
    
    [HttpDelete("")]
    public IActionResult DeletarVeiculo([FromQuery] int id)
    {
        var veiculo = _servico.Deletar(id);
        if (veiculo is null)
        {
            return NotFound();
        }
        return Ok(veiculo);
    }
}