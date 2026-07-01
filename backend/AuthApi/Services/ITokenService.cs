using AuthApi.Models;

namespace AuthApi.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}