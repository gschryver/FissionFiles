using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FissionFiles.Repositories;
using FissionFiles.Models;
using System;
using System.Collections.Generic;

namespace FissionFiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/Category
        [HttpGet]
        public ActionResult GetAllCategories()
        {
            try
            {
                var categories = _categoryRepository.GetAllCategories();

                if (categories == null || categories.Count == 0)
                {
                    return NotFound("No categories found.");
                }

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching categories.");
            }
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public ActionResult GetCategoryById(int id)
        {
            try
            {
                var category = _categoryRepository.GetCategoryById(id);

                if (category == null)
                {
                    return NotFound($"No category found with id {id}.");
                }

                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the category.");
            }
        }

        // Add a category
        [HttpPost]
        public ActionResult AddCategory(Category category)
        {
            try
            {
                _categoryRepository.AddCategory(category);
                return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // Update a category
        [HttpPut("{id}")]
        public ActionResult UpdateCategory(int id, Category category)
        {
            try
            {
                if (id != category.Id)
                {
                    return BadRequest("Category ID mismatch.");
                }

                _categoryRepository.UpdateCategory(category);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // Delete a category
        [HttpDelete("{id}")]
        public ActionResult DeleteCategory(int id)
        {
            try
            {
                var categoryToDelete = _categoryRepository.GetCategoryById(id);

                if (categoryToDelete == null)
                {
                    return NotFound($"No category found with id {id}.");
                }

                _categoryRepository.DeleteCategory(id);
                return Ok($"Category with id {id} was deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("articles/{categoryId}")]
        public ActionResult GetArticlesByCategory(int categoryId)
        {
            try
            {
                var articles = _categoryRepository.GetArticlesByCategory(categoryId);

                if (articles == null)
                {
                    articles = new List<Article>();  // return an empty list if articles are null
                }

                return Ok(articles);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching articles.");
            }
        }


        [HttpPost("assign")]
        public ActionResult AssignCategoryToArticle(int articleId, int categoryId)
        {
            try
            {
                _categoryRepository.AssignCategoryToArticle(articleId, categoryId);
                return Ok($"Category {categoryId} was assigned to article {articleId}.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while assigning category.");
            }
        }

        [HttpPut("update/{articleId}/{categoryId}")]
        public ActionResult UpdateCategoryForArticle(int articleId, int categoryId)
        {
            try
            {
                _categoryRepository.UpdateCategoryForArticle(articleId, categoryId);
                return Ok($"Category of article {articleId} was updated to {categoryId}.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating category.");
            }
        }

        [HttpDelete("delete/{articleId}")]
        public ActionResult DeleteCategoryForArticle(int articleId)
        {
            try
            {
                _categoryRepository.DeleteCategoryForArticle(articleId);
                return Ok($"Category for article {articleId} was deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting category.");
            }
        }
    }
}
