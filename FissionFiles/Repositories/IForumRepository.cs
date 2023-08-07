using FissionFiles.Models;


namespace FissionFiles.Repositories
{
    public interface IForumRepository
    {
        List<Forum> GetAllForums();
        Forum GetForumById(int forumId);
    }
}
