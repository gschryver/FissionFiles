using FissionFiles.Models;
using System.Collections.Generic; 

namespace FissionFiles.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        Post GetPostById(int id);
        List<Post> GetPostsByForumId(int forumId);
        Post AddPost(Post post);
        void UpdatePost(Post post);
        void DeletePost(int id);
    }
}
