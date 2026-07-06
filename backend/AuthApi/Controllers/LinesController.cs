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
    public class LinesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LinesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Save(DrawingDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var line = new LineDrawing
            {
                UserId = int.Parse(userId!),
                Geometry = dto.Geometry,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            _context.Lines.Add(line);
            _context.SaveChanges();

            return Ok(new
            {
                id = line.Id,
                message = "Line başarıyla kaydedildi."
            });
        }
        [HttpGet]
        public IActionResult GetMyLines()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var lines = _context.Lines
                .Where(x => x.UserId == userId && !x.IsDeleted)
                .Select(x => new
                {
                    x.Id,
                    x.Geometry
                })
                .ToList();

            return Ok(lines);
        }
        [HttpPut("{id}/delete")]
        public IActionResult SoftDelete(int id)
        {
            var line = _context.Lines.FirstOrDefault(x => x.Id == id);

            if (line == null)
            {
                return NotFound(new
                {
                    message = "Line bulunamadı."
                });
            }

            line.IsDeleted = true;
            line.UpdatedAt = DateTime.UtcNow;

            _context.SaveChanges();

            return Ok(new
            {
                message = "Line silindi."
            });
        }
    }
}