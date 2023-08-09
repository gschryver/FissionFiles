using FissionFiles.Models;

namespace FissionFiles.Repositories
{
    public interface IUserRepository
    {
        User GetByEmail(string email);
        void RegisterUser(User user);
        User GetById(int id);

        public List<Post> GetPostsByUserId(int userId);
        public List<Article> GetArticlesByUserId(int userId);
        public List<User> GetAllUsers();
        void UpdateUser(User user);
        void DeleteUser(int userId);
        void BanUser(int userId);
        void UnbanUser(int userId);
        User GetUserDetailsById(int id);
    }
}
