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

    }
}
