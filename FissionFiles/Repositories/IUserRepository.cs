using FissionFiles.Models;

namespace FissionFiles.Repositories
{
    public interface IUserRepository
    {
        User GetByEmail(string email);
        void RegisterUser(User user);
    }
}
