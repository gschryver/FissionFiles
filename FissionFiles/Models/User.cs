using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace FissionFiles.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        [ForeignKey("UserType")]
        public int UserTypeId { get; set; }

        public string Email { get; set; }

        public DateTime CreationDate { get; set; }

        public string Avatar { get; set; }
        public string Bio { get; set; }

        public bool IsActive { get; set; }

        public UserType UserType { get; set; }

        public List<Post> Posts { get; set; }

        public List<Article> Articles { get; set; }
    }
}