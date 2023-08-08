using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FissionFiles.Repositories;
using FissionFiles.Models;

namespace FissionFiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var comments = _commentRepository.GetAllComments();

                if (comments == null || comments.Count == 0)
                {
                    return NotFound("No comments found.");
                }

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching comments.");
            }
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var comment = _commentRepository.GetCommentById(id);

                if (comment == null)
                {
                    return NotFound($"No comment found with id {id}.");
                }

                return Ok(comment);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching comment.");
            }
        }

        [HttpGet("forPost/{postId}")]
        public ActionResult GetCommentsForPost(int postId)
        {
            try
            {
                var comments = _commentRepository.GetCommentsForPost(postId);

                if (comments == null || comments.Count == 0)
                {
                    return NotFound($"No comments found for post {postId}.");
                }

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching comments.");
            }
        }

    }
}
