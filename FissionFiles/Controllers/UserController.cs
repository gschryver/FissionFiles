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

    }
}
