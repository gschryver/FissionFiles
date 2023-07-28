using System.ComponentModel.DataAnnotations;

namespace FissionFiles.Models
{
        public class Scientist
        {
            [Key]
            public int Id { get; set; }

            public string FullName { get; set; }

            public string Description { get; set; }

            public string ImageUrl { get; set; }

            public string Title { get; set; }

            public string Achievements { get; set; }

            public List<TimelineEvent> TimelineEvents { get; set; }
        }
    }
