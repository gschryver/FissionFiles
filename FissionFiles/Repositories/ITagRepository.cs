using FissionFiles.Models;
using System.Collections.Generic;

namespace FissionFiles.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();

        Tag GetTagById(int id);

        void AddTag(Tag tag);

        void UpdateTag(Tag tag);

        void DeleteTag(int id);
        List<Post> GetPostsByTagId(int tagId);
        List<Tag> GetTagsByPostId(int postId);
    }
}
