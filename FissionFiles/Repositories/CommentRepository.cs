using FissionFiles.Models;
using FissionFiles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;


namespace FissionFiles.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        // get all comments 
        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Comments";

                    var reader = cmd.ExecuteReader();

                    List<Comment> comments = new List<Comment>();

                    while (reader.Read())
                    {
                        Comment comment = new Comment
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                            Content = DbUtils.GetString(reader, "Content"),
                            IsDeleted = DbUtils.GetBoolean(reader, "IsDeleted"),
                            IsRemoved = DbUtils.GetBoolean(reader, "IsRemoved")
                        };

                      comments.Add(comment);
                            
                    }

                    reader.Close();
                    return comments;
                }
            }
        }

        // get comment by Id 
        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Comments
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Comment comment = null;

                    if (reader.Read())
                    {
                        comment = new Comment
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                            Content = DbUtils.GetString(reader, "Content"),
                            IsDeleted = DbUtils.GetBoolean(reader, "IsDeleted"),
                            IsRemoved = DbUtils.GetBoolean(reader, "IsRemoved")
                        };
                    }

                    reader.Close();
                    return comment;
                }
            }
        }

        // get comments for a specific post 
        public List<Comment> GetCommentsForPost(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT c.*, u.DisplayName AS UserDisplayName 
                FROM Comments c 
                JOIN Users u ON c.UserId = u.Id 
                WHERE c.PostId = @postId AND c.IsDeleted = 0";

                    cmd.Parameters.AddWithValue("@postId", postId);

                    var reader = cmd.ExecuteReader();

                    List<Comment> comments = new List<Comment>();

                    while (reader.Read())
                    {
                        Comment comment = new Comment
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                            Content = DbUtils.GetString(reader, "Content"),
                            IsDeleted = DbUtils.GetBoolean(reader, "IsDeleted"),
                            IsRemoved = DbUtils.GetBoolean(reader, "IsRemoved"),
                            User = new User
                            {
                                DisplayName = DbUtils.GetString(reader, "UserDisplayName")
                            }
                        };

                        comments.Add(comment);
                    }

                    reader.Close();
                    return comments;
                }
            }
        }

        // add a comment to a post 
        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Comments (UserId, PostId, Timestamp, Content, IsDeleted, IsRemoved)
                OUTPUT INSERTED.ID
                VALUES (@userId, @postId, @timestamp, @content, 0, 0)";

                    cmd.Parameters.AddWithValue("@userId", comment.UserId);
                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@timestamp", comment.Timestamp);
                    cmd.Parameters.AddWithValue("@content", comment.Content);

                    comment.Id = (int)cmd.ExecuteScalar(); 
                }
            }
        }

        // update a comment on a post 
        public void UpdateComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                UPDATE Comments 
                SET UserId = @userId, PostId = @postId, Timestamp = @timestamp, 
                    Content = @content, IsDeleted = @isDeleted, IsRemoved = @isRemoved
                WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", comment.Id);
                    cmd.Parameters.AddWithValue("@userId", comment.UserId);
                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@timestamp", comment.Timestamp);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@isDeleted", comment.IsDeleted);
                    cmd.Parameters.AddWithValue("@isRemoved", comment.IsRemoved);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}


