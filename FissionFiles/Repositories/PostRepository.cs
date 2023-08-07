using FissionFiles.Models;
using FissionFiles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FissionFiles.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Use JOIN to fetch related information from Users and Forums tables
                    cmd.CommandText = @"SELECT 
                                    p.Id, p.UserId, p.ForumId, p.Title, p.Timestamp, 
                                    p.Content, p.HeaderImage, p.IsDeleted,
                                    u.firstName, u.lastName, u.displayName, u.email, u.creationDate, u.avatar, u.bio, u.isActive,
                                    f.name AS ForumName, f.description AS ForumDescription, f.isActive AS ForumIsActive
                                FROM 
                                    Posts p
                                INNER JOIN Users u ON p.UserId = u.Id
                                INNER JOIN Forums f ON p.ForumId = f.Id";

                    var posts = new List<Post>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        posts.Add(new Post
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ForumId = DbUtils.GetInt(reader, "ForumId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                            Content = DbUtils.GetString(reader, "Content"),
                            HeaderImage = DbUtils.GetString(reader, "HeaderImage"),
                            IsDeleted = DbUtils.GetBoolean(reader, "IsDeleted"),
                            // Include information from Users
                            User = new User
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "firstName"),
                                LastName = DbUtils.GetString(reader, "lastName"),
                                DisplayName = DbUtils.GetString(reader, "displayName"),
                                Email = DbUtils.GetString(reader, "email"),
                                CreationDate = DbUtils.GetDateTime(reader, "creationDate"),
                                Avatar = DbUtils.GetString(reader, "avatar"),
                                Bio = DbUtils.GetString(reader, "bio"),
                                IsActive = DbUtils.GetBoolean(reader, "isActive")
                            },
                            // Include information from Forums
                            Forum = new Forum
                            {
                                Id = DbUtils.GetInt(reader, "ForumId"),
                                Name = DbUtils.GetString(reader, "ForumName"),
                                Description = DbUtils.GetString(reader, "ForumDescription"),
                                IsActive = DbUtils.GetBoolean(reader, "ForumIsActive")
                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        // get posts by Id 
        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Use JOIN to fetch related information from Users and Forums tables
                    cmd.CommandText = @"SELECT 
                                    p.Id, p.UserId, p.ForumId, p.Title, p.Timestamp, 
                                    p.Content, p.HeaderImage, p.IsDeleted,
                                    u.firstName, u.lastName, u.displayName, u.email, u.creationDate, u.avatar, u.bio, u.isActive,
                                    f.name AS ForumName, f.description AS ForumDescription, f.isActive AS ForumIsActive
                                FROM 
                                    Posts p
                                INNER JOIN Users u ON p.UserId = u.Id
                                INNER JOIN Forums f ON p.ForumId = f.Id
                                WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = new Post
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ForumId = DbUtils.GetInt(reader, "ForumId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                            Content = DbUtils.GetString(reader, "Content"),
                            HeaderImage = DbUtils.GetString(reader, "HeaderImage"),
                            IsDeleted = DbUtils.GetBoolean(reader, "IsDeleted"),
                            // Include information from Users
                            User = new User
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "firstName"),
                                LastName = DbUtils.GetString(reader, "lastName"),
                                DisplayName = DbUtils.GetString(reader, "displayName"),
                                Email = DbUtils.GetString(reader, "email"),
                                CreationDate = DbUtils.GetDateTime(reader, "creationDate"),
                                Avatar = DbUtils.GetString(reader, "avatar"),
                                Bio = DbUtils.GetString(reader, "bio"),
                                IsActive = DbUtils.GetBoolean(reader, "isActive")
                            },
                            // Include information from Forums
                            Forum = new Forum
                            {
                                Id = DbUtils.GetInt(reader, "ForumId"),
                                Name = DbUtils.GetString(reader, "ForumName"),
                                Description = DbUtils.GetString(reader, "ForumDescription"),
                                IsActive = DbUtils.GetBoolean(reader, "ForumIsActive")
                            }
                        };
                    }

                    return post;
                }
            }
        }

        // get posts by forum Id
        public List<Post> GetPostsByForumId(int forumId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Use JOIN to fetch related information from Users and Forums tables
                    cmd.CommandText = @"SELECT 
                                p.Id, p.UserId, p.ForumId, p.Title, p.Timestamp, 
                                p.Content, p.HeaderImage, p.IsDeleted,
                                u.firstName, u.lastName, u.displayName, u.email, u.creationDate, u.avatar, u.bio, u.isActive,
                                f.name AS ForumName, f.description AS ForumDescription, f.isActive AS ForumIsActive
                            FROM 
                                Posts p
                            INNER JOIN Users u ON p.UserId = u.Id
                            INNER JOIN Forums f ON p.ForumId = f.Id
                            WHERE p.ForumId = @forumId AND p.IsDeleted = 0";

                    DbUtils.AddParameter(cmd, "@forumId", forumId);

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ForumId = DbUtils.GetInt(reader, "ForumId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                            Content = DbUtils.GetString(reader, "Content"),
                            HeaderImage = DbUtils.GetString(reader, "HeaderImage"),
                            IsDeleted = DbUtils.GetBoolean(reader, "IsDeleted"),
                            // Include information from Users
                            User = new User
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "firstName"),
                                LastName = DbUtils.GetString(reader, "lastName"),
                                DisplayName = DbUtils.GetString(reader, "displayName"),
                                Email = DbUtils.GetString(reader, "email"),
                                CreationDate = DbUtils.GetDateTime(reader, "creationDate"),
                                Avatar = DbUtils.GetString(reader, "avatar"),
                                Bio = DbUtils.GetString(reader, "bio"),
                                IsActive = DbUtils.GetBoolean(reader, "isActive")
                            },
                            // Include information from Forums
                            Forum = new Forum
                            {
                                Id = DbUtils.GetInt(reader, "ForumId"),
                                Name = DbUtils.GetString(reader, "ForumName"),
                                Description = DbUtils.GetString(reader, "ForumDescription"),
                                IsActive = DbUtils.GetBoolean(reader, "ForumIsActive")
                            }
                        });
                    }

                    reader.Close();
                    return posts;
                }
            }
        }



    }
}

