using FissionFiles.Models;
using System.Collections.Generic;

namespace FissionFiles.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
        List<Article> GetArticlesByCategory(int categoryId);

        void AssignCategoryToArticle(int articleId, int categoryId);

        void UpdateCategoryForArticle(int articleId, int newCategoryId);

        void DeleteCategoryForArticle(int articleId);
        void AddCategory(Category category);
        void UpdateCategory(Category category);
        void DeleteCategory(int id);
    }
}
