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
                            Posts = GetPostsByUserId(id),
                            Articles = GetArticlesByUserId(id),
                            Comments = GetCommentsByUserId(id)
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

        // Comments by User Id for profile page
        public List<Comment> GetCommentsByUserId(int userId)
        {
            List<Comment> comments = new List<Comment>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            SELECT c.Id, c.Content, c.Timestamp, c.UserId, c.PostId, c.IsDeleted, c.IsRemoved
            FROM Comments c
            WHERE c.UserId = @UserId AND c.IsDeleted = 0";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        comments.Add(new Comment
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            IsDeleted = DbUtils.GetBoolean(reader, "IsDeleted"),
                            IsRemoved = DbUtils.GetBoolean(reader, "IsRemoved")
                        });
                    }

                    reader.Close();
                }
            }

            return comments;
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

        // Get only User details by Id
        public User GetUserDetailsById(int id)
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
                            }
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }


        // Update user
        public void UpdateUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Users
                SET firstName = @FirstName, 
                    lastName = @LastName, 
                    email = @Email,
                    avatar = @Avatar,
                    bio = @Bio";

                    if (user.UserType != null && user.UserTypeId.HasValue)
                    {
                        cmd.CommandText += ", userTypeId = @UserTypeId";
                        DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);
                    }

                    cmd.CommandText += " WHERE id = @Id";

                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Avatar", user.Avatar);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        // Delete user
        public void DeleteUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Delete all posts by user
                    cmd.CommandText = @"
                DELETE FROM Posts
                WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();

                    // Reset command text and parameters for the next query
                    cmd.CommandText = string.Empty;
                    cmd.Parameters.Clear();

                    // Delete all articles by user
                    cmd.CommandText = @"
                DELETE FROM Article
                WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();

                    // Reset command text and parameters for the next query
                    cmd.CommandText = string.Empty;
                    cmd.Parameters.Clear();

                    // Delete user
                    cmd.CommandText = @"
                DELETE FROM Users
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // ban a user
        public void BanUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Ban user
                    cmd.CommandText = @"
                UPDATE Users
                SET isActive = 0
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // unban a user 
        public void UnbanUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Unban user
                    cmd.CommandText = @"
                UPDATE Users
                SET isActive = 1
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
