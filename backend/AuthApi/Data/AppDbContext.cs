using Microsoft.EntityFrameworkCore;
using AuthApi.Models;

namespace AuthApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<PointDrawing> Points { get; set; }
        public DbSet<LineDrawing> Lines { get; set; }
        public DbSet<PolygonDrawing> Polygons { get; set; }
    }
}