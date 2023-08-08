using FissionFiles.Models;


namespace FissionFiles.Repositories
{
    public interface IForumRepository
    {
        List<Forum> GetAllForums();
        Forum GetForumById(int forumId);
        void AddForum(Forum forum);
        void DeleteForum(int forumId);
        void UpdateForum(Forum forum);
    }
}
