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
            var posts = _tagRepository.GetPostsByTagId(id);
            if (posts == null || !posts.Any())
            {
                return NotFound();
            }
            return Ok(posts);
        }

        [HttpGet("{id}/tags")]
        public ActionResult<List<Tag>> GetTagsByPostId(int id)
        {
            var tags = _tagRepository.GetTagsByPostId(id);
            if (tags == null || !tags.Any())
            {
                return NotFound();
            }
            return Ok(tags);
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

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteTag(int id)
        {
            _tagRepository.DeleteTag(id);
            return Ok();
        }
    }
}
