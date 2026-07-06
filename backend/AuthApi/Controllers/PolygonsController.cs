using AuthApi.Data;
using AuthApi.Dtos;
using AuthApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PolygonsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PolygonsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Save(DrawingDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var polygon = new PolygonDrawing
            {
                UserId = int.Parse(userId!),
                Geometry = dto.Geometry,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            _context.Polygons.Add(polygon);
            _context.SaveChanges();

            return Ok(new
            {
                id = polygon.Id,
                message = "Polygon başarıyla kaydedildi."
            });
        }
        [HttpGet]
        public IActionResult GetMyPolygons()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var polygons = _context.Polygons
                .Where(x => x.UserId == userId && !x.IsDeleted)
                .Select(x => new
                {
                    x.Id,
                    x.Geometry
                })
                .ToList();

            return Ok(polygons);
        }

        [HttpPut("{id}/delete")]
        public IActionResult SoftDelete(int id)
        {
            var polygon = _context.Polygons.FirstOrDefault(x => x.Id == id);

            if (polygon == null)
            {
                return NotFound(new
                {
                    message = "Polygon bulunamadı."
                });
            }

            polygon.IsDeleted = true;
            polygon.UpdatedAt = DateTime.UtcNow;

            _context.SaveChanges();

            return Ok(new
            {
                message = "Polygon silindi."
            });
        }

    }

}