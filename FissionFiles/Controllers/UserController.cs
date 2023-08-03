using FissionFiles.Models;
using FissionFiles.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FissionFiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetByEmail")]
        public ActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("Register")]
        public ActionResult Register(User user)
        {
            try
            {
                _userRepository.RegisterUser(user);
                return CreatedAtAction(nameof(GetByEmail), new { email = user.Email }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById/{id}")]
        public ActionResult GetById(int id)
        {
            var user = _userRepository.GetById(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("GetAllUsers")]
        public ActionResult GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();

            if (users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }

        [HttpPut("UpdateUser")]
        public ActionResult UpdateUser(User user)
        {
            try
            {
                _userRepository.UpdateUser(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteUser/{id}")]
        public ActionResult DeleteUser(int id)
        {
            var user = _userRepository.GetById(id);

            if (user == null)
            {
                return NotFound();
            }
            _userRepository.DeleteUser(id);
            return Ok();
        }

    }
}
