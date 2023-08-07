using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace FissionFiles.Models
{
    public class Forum
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }  

        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public User User { get; set; } 

        public List<Post> Posts { get; set; }  
    }
}
