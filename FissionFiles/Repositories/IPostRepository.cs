using FissionFiles.Models;

namespace FissionFiles.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        Post GetPostById(int id);
        List<Post> GetPostsByForumId(int forumId);
    }
}
