using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FissionFiles.Repositories;
using FissionFiles.Models;

namespace FissionFiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        // GET: api/Post
        [HttpGet]
        public ActionResult<List<Post>> GetPosts()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        // GET: api/Post/5
        [HttpGet("{id}")]
        public ActionResult<Post> GetPostById(int id)
        {
            var post = _postRepository.GetPostById(id);

            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // Add a post
        [HttpPost]
        public ActionResult<Post> AddPost(Post post)
        {
            try
            {
                var newPost = _postRepository.AddPost(post);

                // If the request is a success, it returns the newly created post and a 201 status code.
                return CreatedAtAction(nameof(GetPostById), new { id = newPost.Id }, newPost);
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }



        [HttpPut("Update/{id}")]
        public ActionResult UpdatePost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.UpdatePost(post);

            return Ok(post);
        }

        [HttpDelete("Delete/{id}")]
        public ActionResult DeletePost(int id)
        {
            _postRepository.DeletePost(id);
            return Ok();
        }

    }
}
