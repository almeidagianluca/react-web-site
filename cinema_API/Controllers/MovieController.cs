using Microsoft.AspNetCore.Mvc;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;
using Microsoft.AspNetCore.Authorization;

namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private MovieContext _context;
        public MovieController(MovieContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<List<Movie>> GetAll() 
        {
            return _context.Movie.ToList();
        }

        [HttpGet("{MovieId}")]
        [Authorize(Roles = "admin")]
        public ActionResult<Movie> Get(int MovieId)
        {
            try
            {
                var result = _context.Movie.Find(MovieId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
        
        [HttpPost]
        [Authorize(Roles = "user,admin")]
        public async Task<ActionResult> post(Movie model)
        {
            try
            {
                _context.Movie.Add(model);
                if (await _context.SaveChangesAsync() == 1)
            {
                //return Ok();
                return Created($"/api/movie/{model.id}",model);
            }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{MovieId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> put(int MovieId, Movie dadosMovieAlt)
        {
            try {
                //verifica se existe movie a ser alterado
                var result = await _context.Movie.FindAsync(MovieId);
                if (MovieId != result.id)
                {
                    return BadRequest();
                }
                result.name = dadosMovieAlt.name;
                result.category = dadosMovieAlt.category;
                result.director = dadosMovieAlt.director;
                result.runningTime = dadosMovieAlt.runningTime;
                await _context.SaveChangesAsync();
                return Created($"/api/movie/{dadosMovieAlt.id}", dadosMovieAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{MovieId}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> delete(int MovieId)
        {
            try
            {
                //verifica se existe movie a ser excluído
                var movie = await _context.Movie.FindAsync(MovieId);
                if (movie == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(movie);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    }
}