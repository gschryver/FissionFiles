using FissionFiles.Models;
using FissionFiles.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace FissionFiles.Repositories
{
    public class ScientistRepository : BaseRepository, IScientistRepository
    {
        public ScientistRepository(IConfiguration configuration) : base(configuration) { }

        // Get all scientists
        public List<Scientist> GetAllScientists()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, FullName, Description, ImageUrl, Title, Achievements FROM Scientist";

                    var reader = cmd.ExecuteReader();
                    List<Scientist> scientists = new List<Scientist>();
                    while (reader.Read())
                    {
                        scientists.Add(new Scientist()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Achievements = DbUtils.GetString(reader, "Achievements")
                        });
                    }
                    reader.Close();
                    return scientists;
                }
            }
        }

        // Get scientist by ID
        public Scientist GetScientistById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, FullName, Description, ImageUrl, Title, Achievements FROM Scientist WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();
                    Scientist scientist = null;
                    if (reader.Read())
                    {
                        scientist = new Scientist()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Achievements = DbUtils.GetString(reader, "Achievements")
                        };
                    }
                    reader.Close();
                    return scientist;
                }
            }
        }

        // Add scientist
        public void AddScientist(Scientist scientist)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Scientist (FullName, Description, ImageUrl, Title, Achievements)
                                        VALUES (@FullName, @Description, @ImageUrl, @Title, @Achievements)";
                    cmd.Parameters.AddWithValue("@FullName", scientist.FullName);
                    cmd.Parameters.AddWithValue("@Description", scientist.Description);
                    cmd.Parameters.AddWithValue("@ImageUrl", scientist.ImageUrl);
                    cmd.Parameters.AddWithValue("@Title", scientist.Title);
                    cmd.Parameters.AddWithValue("@Achievements", scientist.Achievements);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Update scientist
        public void UpdateScientist(Scientist scientist)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Scientist 
                                        SET FullName = @FullName, Description = @Description, ImageUrl = @ImageUrl, Title = @Title, Achievements = @Achievements
                                        WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", scientist.Id);
                    cmd.Parameters.AddWithValue("@FullName", scientist.FullName);
                    cmd.Parameters.AddWithValue("@Description", scientist.Description);
                    cmd.Parameters.AddWithValue("@ImageUrl", scientist.ImageUrl);
                    cmd.Parameters.AddWithValue("@Title", scientist.Title);
                    cmd.Parameters.AddWithValue("@Achievements", scientist.Achievements);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // Delete scientist
        public void DeleteScientist(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Scientist WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
