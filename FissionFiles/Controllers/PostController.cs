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

        [HttpPost]
        public ActionResult<Post> AddPost(PostInputModel inputModel)
        {
            _postRepository.AddPost(inputModel);
            return CreatedAtAction(nameof(GetPostById), new { id = inputModel.Post.Id }, inputModel.Post);
        }

        [HttpPut("Update/{id}")]
        public ActionResult UpdatePost(int id, PostInputModel inputModel)
        {
            if (id != inputModel.Post.Id)
            {
                return BadRequest();
            }

            _postRepository.UpdatePost(inputModel);
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public ActionResult DeletePost(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }

    }
}
