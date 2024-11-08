using technical_tests_backend_ssr.Services.Interfaces;
using technical_tests_backend_ssr.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await _authService.AuthenticateAsync(loginDto);

        if (user == null)
            return Unauthorized("Invalid credentials");

        return Ok(user); 
    }
}
