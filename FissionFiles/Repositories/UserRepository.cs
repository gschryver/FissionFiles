using FissionFiles.Models;
using FissionFiles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace FissionFiles.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        // This is for log-in purposes 
        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.id, u.firstName, u.lastName, u.displayName, 
                               u.userTypeId, u.email, u.creationDate, u.avatar,
                               u.bio, u.isActive
                        FROM Users u
                        WHERE u.email = @Email";

                    DbUtils.AddParameter(cmd, "@Email", email);

                    User user = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirstName = DbUtils.GetString(reader, "firstName"),
                            LastName = DbUtils.GetString(reader, "lastName"),
                            DisplayName = DbUtils.GetString(reader, "displayName"),
                            UserTypeId = DbUtils.GetInt(reader, "userTypeId"),
                            Email = DbUtils.GetString(reader, "email"),
                            CreationDate = DbUtils.GetDateTime(reader, "creationDate"),
                            Avatar = DbUtils.GetString(reader, "avatar"),
                            Bio = DbUtils.GetString(reader, "bio"),
                            IsActive = DbUtils.GetBoolean(reader, "isActive"),
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        // Registration 
        public void RegisterUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Users (firstName, lastName, displayName, userTypeId, email, creationDate, avatar, bio, isActive)
                OUTPUT INSERTED.ID
                VALUES (@FirstName, @LastName, @DisplayName, @UserTypeId, @Email, @CreationDate, @Avatar, @Bio, @IsActive)";

                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@UserTypeId", 2); // Defaulting userTypeId to 2
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@CreationDate", DateTime.Now); 
                    DbUtils.AddParameter(cmd, "@Avatar", "default.jpg"); 
                    DbUtils.AddParameter(cmd, "@Bio", ""); 
                    DbUtils.AddParameter(cmd, "@IsActive", true); // Defaulting isActive to true

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // Get by Id
        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT u.id, u.firstName, u.lastName, u.displayName, 
                       u.userTypeId, u.email, u.creationDate, u.avatar,
                       u.bio, u.isActive,
                       ut.Name as UserTypeName
                FROM Users u
                JOIN UserType ut ON u.userTypeId = ut.Id
                WHERE u.id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    User user = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirstName = DbUtils.GetString(reader, "firstName"),
                            LastName = DbUtils.GetString(reader, "lastName"),
                            DisplayName = DbUtils.GetString(reader, "displayName"),
                            UserTypeId = DbUtils.GetInt(reader, "userTypeId"),
                            Email = DbUtils.GetString(reader, "email"),
                            CreationDate = DbUtils.GetDateTime(reader, "creationDate"),
                            Avatar = DbUtils.GetString(reader, "avatar"),
                            Bio = DbUtils.GetString(reader, "bio"),
                            IsActive = DbUtils.GetBoolean(reader, "isActive"),
                            UserType = new UserType
                            {
                                Id = DbUtils.GetInt(reader, "userTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName")
                            },
                            Posts = GetPostsByUserId(id), // Method to get the posts
                            Articles = GetArticlesByUserId(id) // Method to get the articles
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        // Articles by User Id for profile page
        public List<Article> GetArticlesByUserId(int userId)
        {
            List<Article> articles = new List<Article>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT a.Id, a.Title, a.Content, a.PublicationDate, a.UserId
                FROM Article a
                WHERE a.UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        articles.Add(new Article
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            PublicationDate = DbUtils.GetDateTime(reader, "PublicationDate"),
                            UserId = DbUtils.GetInt(reader, "UserId")
                        });
                    }

                    reader.Close();
                }
            }

            return articles;
        }

        // Posts by User Id for profile page
        public List<Post> GetPostsByUserId(int userId)
        {
            List<Post> posts = new List<Post>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT p.Id, p.Title, p.Content, p.Timestamp, p.UserId, p.forumId
                FROM Posts p
                WHERE p.UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        posts.Add(new Post
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ForumId = DbUtils.GetInt(reader, "ForumId")
                        });
                    }

                    reader.Close();
                }
            }

            return posts;
        }

        // Fetch all users for UserList page
        public List<User> GetAllUsers()
        {
            List<User> users = new List<User>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT u.id, u.firstName, u.lastName, u.displayName, 
                       u.userTypeId, u.email, u.creationDate, u.avatar,
                       u.bio, u.isActive,
                       ut.Name as UserTypeName
                FROM Users u
                JOIN UserType ut ON u.userTypeId = ut.Id";

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            FirstName = DbUtils.GetString(reader, "firstName"),
                            LastName = DbUtils.GetString(reader, "lastName"),
                            DisplayName = DbUtils.GetString(reader, "displayName"),
                            UserTypeId = DbUtils.GetInt(reader, "userTypeId"),
                            Email = DbUtils.GetString(reader, "email"),
                            CreationDate = DbUtils.GetDateTime(reader, "creationDate"),
                            Avatar = DbUtils.GetString(reader, "avatar"),
                            Bio = DbUtils.GetString(reader, "bio"),
                            IsActive = DbUtils.GetBoolean(reader, "isActive"),
                            UserType = new UserType
                            {
                                Id = DbUtils.GetInt(reader, "userTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName")
                            }
                        });
                    }

                    reader.Close();
                }
            }

            return users;
        }   


    }
}
