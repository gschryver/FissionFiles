using FissionFiles.Models;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FissionFiles.Model
{
    public class Forum
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public int ModeratorId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public User User { get; set; }

        public List<Post> Posts { get; set; }
    }
}