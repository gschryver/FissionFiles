using FissionFiles.Models;

namespace FissionFiles.Repositories
{
    public interface IArticleRepository
    {
        List<Article> GetAllArticles();
        Article GetArticleById(int id);
        List<Article> GetArticlesByUserId(int userId);
        void AddArticle(Article article);
        void UpdateArticle(Article article);
        void DeleteArticle(int id);
    }
}
