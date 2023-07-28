using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FissionFiles.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Post")]
        public int PostId { get; set; }

        public DateTime Timestamp { get; set; }

        public string Content { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsRemoved { get; set; }

        public User User { get; set; }

        public Post Post { get; set; }
    }
}