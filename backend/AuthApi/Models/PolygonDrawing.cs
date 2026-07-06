namespace AuthApi.Models
{
    public class PolygonDrawing
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Geometry { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; } = false;
    }
}