using System.ComponentModel.DataAnnotations;

namespace FissionFiles.Models
{
    public class UserType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<User> Users { get; set; }
    }
}