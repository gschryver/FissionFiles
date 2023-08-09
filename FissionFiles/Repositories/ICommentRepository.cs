using FissionFiles.Models;

namespace FissionFiles.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllComments();
        Comment GetCommentById(int id);
        List<Comment> GetCommentsForPost(int postId);
        void AddComment(Comment comment);
        void UpdateComment(Comment comment);
        void DeleteComment(int commentId);
        void RemoveComment(int commentId);
    }
}
