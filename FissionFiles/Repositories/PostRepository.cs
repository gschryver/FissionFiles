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

        public Post AddPost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Posts (UserId, ForumId, Title, Timestamp, Content, HeaderImage, IsDeleted)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @ForumId, @Title, @Timestamp, @Content, @HeaderImage, @IsDeleted)";

                    DbUtils.AddParameter(cmd, "@UserId", post.UserId);
                    DbUtils.AddParameter(cmd, "@ForumId", post.ForumId);
                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Timestamp", post.Timestamp);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@HeaderImage", post.HeaderImage);
                    DbUtils.AddParameter(cmd, "@IsDeleted", post.IsDeleted);

                    var id = (int)cmd.ExecuteScalar();

                    return GetPostById(id);
                }
            }
        }

        public void UpdatePost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Posts 
                SET Title = @Title, 
                    Content = @Content, 
                    HeaderImage = @HeaderImage, 
                    IsDeleted = @IsDeleted,
                    ForumId = @ForumId,
                    Timestamp = @Timestamp,
                    UserId = @UserId
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@HeaderImage", post.HeaderImage);
                    DbUtils.AddParameter(cmd, "@IsDeleted", post.IsDeleted);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);
                    DbUtils.AddParameter(cmd, "@ForumId", post.ForumId);
                    DbUtils.AddParameter(cmd, "@Timestamp", post.Timestamp);
                    DbUtils.AddParameter(cmd, "@UserId", post.UserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // delete a post by its ID (soft delete, setting IsDeleted to true)
        public void DeletePost(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Posts 
                                SET IsDeleted = 1 
                                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}

