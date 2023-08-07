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

    }
}
