using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FissionFiles.Repositories;
using FissionFiles.Models;

namespace FissionFiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleController(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        // GET: api/Article
        [HttpGet]
        public ActionResult<List<Article>> GetArticles()
        {
            return Ok(_articleRepository.GetAllArticles());
        }

        // GET: api/Article/5
        [HttpGet("{id}")]
        public ActionResult<Article> GetArticle(int id)
        {
            var article = _articleRepository.GetArticleById(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        // GET: api/Article/user/5
        [HttpGet("user/{userId}")]
        public ActionResult<List<Article>> GetArticlesByUserId(int userId)
        {
            return Ok(_articleRepository.GetArticlesByUserId(userId));
        }

        // POST: api/Article
        [HttpPost]
        public ActionResult<Article>AddArticle(Article article)
        {
            _articleRepository.AddArticle(article);

            return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
        }

        // PUT: api/Article/5
        [HttpPut("Update/{id}")]
        public ActionResult UpdateArticle(int id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }

            _articleRepository.UpdateArticle(article);

           return Ok(article);
        }

        // DELETE: api/Article/5
        [HttpDelete("Delete/{id}")]
        public ActionResult DeleteArticle(int id)
        {
            if (_articleRepository.GetArticleById(id) == null)
            {
                return NotFound();
            }
            
            _articleRepository.DeleteArticle(id);

            return Ok(); 
        }
    }
}
