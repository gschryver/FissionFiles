using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FissionFiles.Models
{
    public class TimelineEvent
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Scientist")]
        public int ScientistId { get; set; }

        public string EventName { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public Scientist Scientist { get; set; }
    }
}