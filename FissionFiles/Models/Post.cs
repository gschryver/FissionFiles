using FissionFiles.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FissionFiles.Models
{
    public class Post 
    {
    [Key]
    public int Id { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    [ForeignKey("Forum")]
    public int ForumId { get; set; }

    public string Title { get; set; }

    public DateTime Timestamp { get; set; }

    public string Content { get; set; }

    public string HeaderImage { get; set; }

    public bool IsDeleted { get; set; }

    public User User { get; set; }

    public Forum Forum { get; set; }

    public List<Comment> Comments { get; set; }
}

}