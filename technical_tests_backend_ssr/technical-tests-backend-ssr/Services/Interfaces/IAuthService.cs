using technical_tests_backend_ssr.DTOs;
using System.Threading.Tasks;

namespace technical_tests_backend_ssr.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User> AuthenticateAsync(LoginDto loginDto);
    }
}
