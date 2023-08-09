using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FissionFiles.Repositories;
using FissionFiles.Models;

namespace FissionFiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IForumRepository _forumRepository;

        // Injecting the PostRepository through the constructor
        public ForumController(IPostRepository postRepository, IForumRepository forumRepository)
        {
            _postRepository = postRepository;
            _forumRepository = forumRepository;
        }

        // get all forums
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var forums = _forumRepository.GetAllForums();

                if (forums == null || forums.Count == 0)
                {
                    return NotFound("No forums found.");
                }

                return Ok(forums);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching forums.");
            }
        }

        // Get posts by forum ID
        [HttpGet("{forumId}/posts")]
        public ActionResult GetPostsByForumId(int forumId)
        {
            try
            {
                var posts = _postRepository.GetPostsByForumId(forumId);

                if (posts == null || posts.Count == 0)
                {
                    return NotFound($"No posts found for forum with ID {forumId}");
                }

                return Ok(posts);
            }
            catch (Exception ex) 
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching posts.");
            }
        }

        // Get forum by ID
        [HttpGet("{forumId}")]
        public ActionResult GetForumById(int forumId)
        {
            try
            {
                var forum = _forumRepository.GetForumById(forumId);

                if (forum == null)
                {
                    return NotFound($"No forum found with ID {forumId}");
                }

                return Ok(forum);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching forum.");
            }
        }

        // Add a forum
        [HttpPost]
        public ActionResult AddForum(Forum forum)
        {
            try
            {
                _forumRepository.AddForum(forum);

                return CreatedAtAction("GetForumById", new { forumId = forum.Id }, forum);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding forum.");
            }
        }

        // Delete a forum by ID
        [HttpDelete("Delete/{forumId}")]
        public ActionResult DeleteForum(int forumId)
        {
            if (_forumRepository.GetForumById(forumId) == null)
            {
                return NotFound();
            }

            _forumRepository.DeleteForum(forumId);

            return Ok();
        }

        // update a forum 
        [HttpPut("Update/{forumId}")]
        public ActionResult UpdateForum(int forumId, Forum forum)
        {
            if (forumId != forum.Id)
            {
                return BadRequest();
            }

            if (_forumRepository.GetForumById(forumId) == null)
            {
                return NotFound();
            }

            _forumRepository.UpdateForum(forum);

            return Ok();
        }

        // Deactivate a forum by ID
        [HttpPut("Deactivate/{forumId}")]
        public ActionResult DeactivateForum(int forumId)
        {
            // Check if forum exists
            if (_forumRepository.GetForumById(forumId) == null)
            {
                return NotFound($"No forum found with ID {forumId}");
            }

            try
            {
                _forumRepository.DeactivateForum(forumId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while deactivating the forum: {ex.Message}");
            }
        }

        // Reactivate a forum by ID
        [HttpPut("Reactivate/{forumId}")]
        public ActionResult ReactivateForum(int forumId)
        {
            // Check if forum exists
            if (_forumRepository.GetForumById(forumId) == null)
            {
                return NotFound($"No forum found with ID {forumId}");
            }

            try
            {
                _forumRepository.ReactivateForum(forumId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while reactivating the forum: {ex.Message}");
            }
        }



    }
}
