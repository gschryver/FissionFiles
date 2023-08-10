using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FissionFiles.Models
{
    public class PostTags
    {
        [Key, Column(Order = 0)]
        public int PostId { get; set; }

        [Key, Column(Order = 1)]
        public int TagId { get; set; }

        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }

        [ForeignKey("TagId")]
        public virtual Tag Tag { get; set; }
    }
}
