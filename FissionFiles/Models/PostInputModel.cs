namespace FissionFiles.Models
{
    public class PostInputModel
    {
        public Post Post { get; set; }
        public User? User { get; set; }
        public Forum? Forum { get; set; }
    }
}
