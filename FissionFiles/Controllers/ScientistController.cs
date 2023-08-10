using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FissionFiles.Repositories;
using FissionFiles.Models;

namespace FissionFiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScientistController : ControllerBase
    {
        private readonly IScientistRepository _scientistRepository;

        public ScientistController(IScientistRepository scientistRepository)
        {
            _scientistRepository = scientistRepository;
        }

        [HttpGet("GetAllScientists")]
        public ActionResult GetAllScientists()
        {
            var scientists = _scientistRepository.GetAllScientists();

            if (scientists == null || scientists.Count == 0)
            {
                return NotFound("No scientists found.");
            }

            return Ok(scientists);
        }

        [HttpGet("GetScientistById/{id}")]
        public ActionResult GetScientistById(int id)
        {
            var scientist = _scientistRepository.GetScientistById(id);

            if (scientist == null)
            {
                return NotFound($"No scientist found with ID {id}");
            }

            return Ok(scientist);
        }

        [HttpPost("AddScientist")]
        public ActionResult AddScientist(Scientist scientist)
        {
            try
            {
                _scientistRepository.AddScientist(scientist);
                return CreatedAtAction(nameof(GetScientistById), new { id = scientist.Id }, scientist);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateScientist")]
        public ActionResult UpdateScientist(Scientist scientist)
        {
            try
            {
                _scientistRepository.UpdateScientist(scientist);
                return Ok(scientist);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteScientist/{id}")]
        public ActionResult DeleteScientist(int id)
        {
            var scientist = _scientistRepository.GetScientistById(id);

            if (scientist == null)
            {
                return NotFound();
            }
            _scientistRepository.DeleteScientist(id);
            return Ok();
        }

    }
}
