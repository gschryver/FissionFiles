using FissionFiles.Models;
using FissionFiles.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FissionFiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public ActionResult<List<Tag>> GetAllTags()
        {
            return Ok(_tagRepository.GetAllTags());
        }

        [HttpGet("{id}")]
        public ActionResult<Tag> GetTagById(int id)
        {
            var tag = _tagRepository.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        [HttpGet("{id}/posts")]
        public ActionResult<List<Post>> GetPostsByTagId(int id)
        {
            var tag = _tagRepository.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }

            var posts = _tagRepository.GetPostsByTagId(id) ?? new List<Post>();

            return Ok(posts);
        }


        [HttpGet("{id}/tags")]
        public ActionResult<List<Tag>> GetTagsByPostId(int id)
        {
            var post = _tagRepository.GetTagsByPostId(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
      

        [HttpPut("Update/{id}")]
        public IActionResult UpdateTag(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }
            _tagRepository.UpdateTag(tag);
            return Ok(tag);
        }

        [HttpPost("Add")]
        public ActionResult AddTag(Tag tag)
        {
            _tagRepository.AddTag(tag);
            return CreatedAtAction(nameof(GetTagById), new { id = tag.Id }, tag);
        }

        [HttpDelete("Delete/{id}")]
        public ActionResult DeleteTag(int id)
        {
            _tagRepository.DeleteTag(id);
            return Ok();
        }

        [HttpPost("{postId}/tags")]
        public ActionResult AddTagsToPost(int postId, [FromBody] List<int> tagIds)
        {
            try
            {
                // checks if any of the tags are already associated with the post
                var existingTags = _tagRepository.GetTagsByPostId(postId);
                var conflictingTags = existingTags.Where(t => tagIds.Contains(t.Id)).ToList();

                if (conflictingTags.Any())
                {
                    return Conflict($"The following tags are already associated with the post: {string.Join(", ", conflictingTags.Select(t => t.Name))}");
                }

                _tagRepository.AddTagsToPost(postId, tagIds);
                return Ok("Tags added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpDelete("RemoveFromPost/{postId}")]
        public ActionResult RemoveTagFromPost(int postId, [FromBody] int tagId)
        {
            try
            {
                _tagRepository.RemoveTagFromPost(postId, tagId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
