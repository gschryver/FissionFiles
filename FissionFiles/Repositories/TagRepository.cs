using FissionFiles.Models;
using FissionFiles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace FissionFiles.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration)
            : base(configuration) { }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Tag";

                    var tags = new List<Tag>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        tags.Add(
                            new Tag
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            }
                        );
                    }

                    reader.Close();

                    return tags;
                }
            }
        }

        public Tag GetTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Tag WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        return new Tag
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }

                    reader.Close();
                    return null;
                }
            }
        }

        public void AddTag(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Tag (Name) VALUES (@Name)";
                    cmd.Parameters.AddWithValue("@Name", tag.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateTag(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Tag SET Name = @Name WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", tag.Id);
                    cmd.Parameters.AddWithValue("@Name", tag.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Tag WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Post> GetPostsByTagId(int tagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"SELECT p.Id, p.UserId, p.ForumId, p.Title, p.Timestamp, 
                        p.Content, p.HeaderImage, p.IsDeleted
                  FROM PostTags pt
                  INNER JOIN Posts p ON pt.PostId = p.Id
                  WHERE pt.TagId = @TagId";

                    cmd.Parameters.AddWithValue("@TagId", tagId);

                    var posts = new List<Post>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        posts.Add(
                            new Post
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                ForumId = DbUtils.GetInt(reader, "ForumId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Timestamp = DbUtils.GetDateTime(reader, "Timestamp"),
                                Content = DbUtils.GetString(reader, "Content"),
                                HeaderImage = DbUtils.GetString(reader, "HeaderImage"),
                                IsDeleted = DbUtils.GetBoolean(reader, "IsDeleted")
                            }
                        );
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        // get tags for a post 
        public List<Tag> GetTagsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"SELECT t.Id, t.Name
                  FROM PostTags pt
                  INNER JOIN Tag t ON pt.TagId = t.Id
                  WHERE pt.PostId = @PostId";

                    cmd.Parameters.AddWithValue("@PostId", postId);

                    var tags = new List<Tag>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        tags.Add(new Tag                    
                        {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            }
                                                                              );
                    }

                    reader.Close();

                    return tags;
                }
            }
        }

    }
}
