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



    }
}
