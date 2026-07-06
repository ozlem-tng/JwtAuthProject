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
    public class PointsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PointsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Save(DrawingDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var point = new PointDrawing
            {
                UserId = int.Parse(userId!),
                Geometry = dto.Geometry,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            _context.Points.Add(point);
            _context.SaveChanges();

            return Ok(new
            {
                id = point.Id,
                message = "Point başarıyla kaydedildi."
            });
        }




        [HttpGet]
        public IActionResult GetMyPoints()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim);

            var points = _context.Points
                .Where(x => x.UserId == userId && !x.IsDeleted)
                .Select(x => new
                {
                    x.Id,
                    x.Geometry
                })
                .ToList();

            return Ok(points);
        }

        [HttpPut("{id}/delete")]
        public IActionResult SoftDelete(int id)
        {
            var point = _context.Points.FirstOrDefault(x => x.Id == id);

            if (point == null)
            {
                return NotFound(new
                {
                    message = "Point bulunamadı."
                });
            }

            point.IsDeleted = true;
            point.UpdatedAt = DateTime.UtcNow;

            _context.SaveChanges();

            return Ok(new
            {
                message = "Point silindi."
            });
        }



    }
}