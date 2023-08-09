using FissionFiles.Models;
using FissionFiles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FissionFiles.Repositories
{
    public class ForumRepository : BaseRepository, IForumRepository
    {
        public ForumRepository(IConfiguration configuration) : base(configuration) { }

        public List<Forum> GetAllForums()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Forums";

                    var forums = new List<Forum>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        forums.Add(new Forum
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            IsActive = DbUtils.GetBoolean(reader, "IsActive")
                        });
                    }

                    reader.Close();

                    return forums;
                }
            }
        }

        public Forum GetForumById(int forumId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                        f.Id, f.name AS ForumName, f.description AS ForumDescription, f.isActive AS ForumIsActive
                    FROM 
                        Forums f
                    WHERE f.Id = @forumId";

                    DbUtils.AddParameter(cmd, "@forumId", forumId);

                    var reader = cmd.ExecuteReader();

                    Forum forum = null;

                    if (reader.Read())
                    {
                        forum = new Forum
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "ForumName"),
                            Description = DbUtils.GetString(reader, "ForumDescription"),
                            IsActive = DbUtils.GetBoolean(reader, "ForumIsActive")
                        };
                    }

                    reader.Close();
                    return forum;
                }
            }
        }

        // add a new forum 
        public void AddForum(Forum forum)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Forums (Name, Description, IsActive, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name, @description, @isActive, @userId)";

                    DbUtils.AddParameter(cmd, "@name", forum.Name);
                    DbUtils.AddParameter(cmd, "@description", forum.Description);
                    DbUtils.AddParameter(cmd, "@isActive", forum.IsActive);
                    DbUtils.AddParameter(cmd, "@userId", forum.UserId);

                    forum.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        // update a forum 
        public void UpdateForum(Forum forum)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Forums
                                        SET Name = @name,
                                            Description = @description,
                                            IsActive = @isActive
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", forum.Name);
                    DbUtils.AddParameter(cmd, "@description", forum.Description);
                    DbUtils.AddParameter(cmd, "@isActive", forum.IsActive);
                    DbUtils.AddParameter(cmd, "@id", forum.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // delete a forum
        public void DeleteForum(int forumId)
        {
            try
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        DbUtils.AddParameter(cmd, "@forumId", forumId);

                        cmd.CommandText = @"DELETE FROM Comments
                                    WHERE postId IN (SELECT id FROM Posts WHERE forumId = @forumId)";
                        cmd.ExecuteNonQuery();

                        cmd.CommandText = @"DELETE FROM Posts WHERE ForumId = @forumId";
                        cmd.ExecuteNonQuery();

                        cmd.CommandText = @"DELETE FROM Forums WHERE Id = @forumId";
                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        // deactivate a forum 
        public void DeactivateForum(int forumId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // 'delete' all posts in the forum
                    cmd.CommandText = @"UPDATE Posts SET IsDeleted = 1 WHERE ForumId = @forumId";
                    DbUtils.AddParameter(cmd, "@forumId", forumId);
                    cmd.ExecuteNonQuery();

                    cmd.Parameters.Clear();

                    // deactivate the forum
                    cmd.CommandText = @"UPDATE Forums SET IsActive = 0 WHERE Id = @forumId";
                    DbUtils.AddParameter(cmd, "@forumId", forumId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        // reactivate 
        public void ReactivateForum(int forumId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // 'undelete' all posts in the forum
                    cmd.CommandText = @"UPDATE Posts SET IsDeleted = 0 WHERE ForumId = @forumId";
                    DbUtils.AddParameter(cmd, "@forumId", forumId);
                    cmd.ExecuteNonQuery();

                    cmd.Parameters.Clear();

                    // reactivate the forum
                    cmd.CommandText = @"UPDATE Forums SET IsActive = 1 WHERE Id = @forumId";
                    DbUtils.AddParameter(cmd, "@forumId", forumId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
