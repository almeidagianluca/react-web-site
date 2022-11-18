namespace ProjetoEscola_API.Models
{
    public class Movie
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? category { get; set; }
        public string? director { get; set; }
        public string? runningTime { get; set; }
        public string? imageLink { get; set; }
    }
}