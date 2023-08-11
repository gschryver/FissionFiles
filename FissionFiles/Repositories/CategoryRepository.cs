using FissionFiles.Models;
using FissionFiles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FissionFiles.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        // Get all categories
        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Category";

                    var reader = cmd.ExecuteReader();

                    List<Category> categories = new List<Category>();

                    while (reader.Read())
                    {
                        Category category = new Category
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description")
                        };

                        categories.Add(category);
                    }

                    reader.Close();
                    return categories;
                }
            }
        }

        // Get a category by ID
        public Category GetCategoryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Category WHERE Id = @Id";
                    cmd.Parameters.Add(new SqlParameter("@Id", id));

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Category category = new Category
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description")
                        };

                        reader.Close();
                        return category;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }


        // Get all articles by category
        public List<Article> GetArticlesByCategory(int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Article WHERE CategoryId = @CategoryId";

                    cmd.Parameters.Add(new SqlParameter("@CategoryId", categoryId));

                    var reader = cmd.ExecuteReader();

                    List<Article> articles = new List<Article>();

                    while (reader.Read())
                    {
                        Article article = new Article
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Author = DbUtils.GetString(reader, "Author"),
                            PublicationDate = DbUtils.GetDateTime(reader, "PublicationDate")
                        };

                        articles.Add(article);
                    }

                    reader.Close();
                    return articles;
                }
            }
        }

        // Assign a category to an article
        public void AssignCategoryToArticle(int articleId, int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Article SET CategoryId = @CategoryId WHERE Id = @ArticleId";

                    cmd.Parameters.Add(new SqlParameter("@ArticleId", articleId));
                    cmd.Parameters.Add(new SqlParameter("@CategoryId", categoryId));

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Update a category for an article
        public void UpdateCategoryForArticle(int articleId, int newCategoryId)
        {
            AssignCategoryToArticle(articleId, newCategoryId); 
        }

        // Delete a category for an article
        public void DeleteCategoryForArticle(int articleId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Article SET CategoryId = NULL WHERE Id = @ArticleId";

                    cmd.Parameters.Add(new SqlParameter("@ArticleId", articleId));

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Add a category
        public void AddCategory(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Category (Name, Description)
                OUTPUT INSERTED.Id
                VALUES (@Name, @Description)";

                    cmd.Parameters.Add(new SqlParameter("@Name", category.Name));
                    cmd.Parameters.Add(new SqlParameter("@Description", category.Description));

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // Update a category
        public void UpdateCategory(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Category
                SET Name = @Name, Description = @Description
                WHERE Id = @Id";

                    cmd.Parameters.Add(new SqlParameter("@Id", category.Id));
                    cmd.Parameters.Add(new SqlParameter("@Name", category.Name));
                    cmd.Parameters.Add(new SqlParameter("@Description", category.Description));

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Delete a category
        public void DeleteCategory(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Category WHERE Id = @Id";

                    cmd.Parameters.Add(new SqlParameter("@Id", id));

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
