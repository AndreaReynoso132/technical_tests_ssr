using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using technical_tests_backend_ssr.DTOs;
using technical_tests_backend_ssr.Services.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UserController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user);
        }
        catch (KeyNotFoundException)
        {
            return NotFound($"Usuario con ID {id} no encontrado.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserDto userDto)
    {
        var user = _mapper.Map<User>(userDto);
        await _userService.AddUserAsync(user); // Verifica que aquí se esté usando UserService y no AuthService
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUserDto updateUserDto)
    {
        var user = await _userService.GetUserByIdAsync(id);

        if (user == null)
            return NotFound("Usuario no encontrado");

        await _userService.UpdateUserAsync(user, updateUserDto);

        return Ok("Usuario actualizado correctamente"); 
    }




    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _userService.DeleteUserAsync(id);
            return Ok(new { message = $"Usuario con ID {id} ha sido eliminado con éxito." });
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { error = $"Error: Usuario con ID {id} no encontrado. No se pudo eliminar." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Ocurrió un error inesperado: {ex.Message}" });
        }
    }

}

