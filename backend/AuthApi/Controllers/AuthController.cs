using AuthApi.Data;
using AuthApi.DTOs;
using AuthApi.Models;
using AuthApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace AuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(
            AppDbContext context,
            ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (existingUser != null)
            {
                return BadRequest("Bu e-posta adresi zaten kayıtlı.");
            }
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = passwordHash
            };
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return Ok("Kullanıcı başarıyla oluşturuldu.");

        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users
         .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (user == null)
            {
                return BadRequest("E-posta veya şifre hatalı.");
            }
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(
              dto.Password,
              user.PasswordHash);

            if (!isPasswordValid)
            {
                return BadRequest("E-posta veya şifre hatalı.");
            }

            string token = _tokenService.CreateToken(user);

            return Ok(new
            {
                Message = "Giriş başarılı.",
                Token = token
            });
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = User.FindFirstValue(ClaimTypes.Email);
            var fullName = User.FindFirst("FullName")?.Value;

            return Ok(new
            {
                Id = id,
                FullName = fullName,
                Email = email
            });
        }
    }





}