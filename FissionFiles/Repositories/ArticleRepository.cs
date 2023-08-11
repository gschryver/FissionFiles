using FissionFiles.Models;
using FissionFiles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace FissionFiles.Repositories
{
    public class ArticleRepository : BaseRepository, IArticleRepository
    {
        public ArticleRepository(IConfiguration configuration) : base(configuration) { }

        public List<Article> GetAllArticles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Article";

                    var articles = new List<Article>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        articles.Add(new Article
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Author = DbUtils.GetString(reader, "Author"),
                            PublicationDate = DbUtils.GetDateTime(reader, "PublicationDate"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId")
                        });
                    }

                    reader.Close();

                    return articles;
                }
            }
        }

        public Article GetArticleById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Article WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    Article article = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        article = new Article
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Author = DbUtils.GetString(reader, "Author"),
                            PublicationDate = DbUtils.GetDateTime(reader, "PublicationDate"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId")
                        };
                    }

                    reader.Close();

                    return article;
                }
            }
        }

        public List<Article> GetArticlesByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Article WHERE UserId = @UserId";
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var articles = new List<Article>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        articles.Add(new Article
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Author = DbUtils.GetString(reader, "Author"),
                            PublicationDate = DbUtils.GetDateTime(reader, "PublicationDate"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId")
                        });
                    }

                    reader.Close();

                    return articles;
                }
            }
        }

        // create a new article
        public void AddArticle(Article article)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Article (UserId, Title, Content, Author, PublicationDate, CategoryId, ImageUrl) 
                                VALUES (@UserId, @Title, @Content, @Author, @PublicationDate, @CategoryId, @ImageUrl)";

                    DbUtils.AddParameter(cmd, "@UserId", article.UserId);
                    DbUtils.AddParameter(cmd, "@Title", article.Title);
                    DbUtils.AddParameter(cmd, "@Content", article.Content);
                    DbUtils.AddParameter(cmd, "@Author", article.Author);
                    DbUtils.AddParameter(cmd, "@PublicationDate", article.PublicationDate);
                    DbUtils.AddParameter(cmd, "@CategoryId", article.CategoryId);
                    DbUtils.AddParameter(cmd, "@ImageUrl", article.ImageUrl);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // update article by id
        public void UpdateArticle(Article article)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Article 
                                        SET UserId = @UserId, 
                                            Title = @Title, 
                                            Content = @Content, 
                                            Author = @Author, 
                                            PublicationDate = @PublicationDate,
                                            CategoryId = @CategoryId,   
                                            ImageUrl = @ImageUrl
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@UserId", article.UserId);
                    DbUtils.AddParameter(cmd, "@Title", article.Title);
                    DbUtils.AddParameter(cmd, "@Content", article.Content);
                    DbUtils.AddParameter(cmd, "@Author", article.Author);
                    DbUtils.AddParameter(cmd, "@PublicationDate", article.PublicationDate);
                    DbUtils.AddParameter(cmd, "@CategoryId", article.CategoryId);
                    DbUtils.AddParameter(cmd, "@ImageUrl", article.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Id", article.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // delete article by id
        public void DeleteArticle(int articleId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Article WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", articleId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
