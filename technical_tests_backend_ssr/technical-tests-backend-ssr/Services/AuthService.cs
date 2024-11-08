using technical_tests_backend_ssr.Data;
using technical_tests_backend_ssr.DTOs;
using technical_tests_backend_ssr.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net; // Importa la biblioteca BCrypt

namespace technical_tests_backend_ssr.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> AuthenticateAsync(LoginDto loginDto)
        {
            // Buscar el usuario por nombre de usuario
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Usuario == loginDto.Usuario);

            // Verificar si el usuario existe
            if (user == null)
                throw new Exception("Credenciales inválidas");

            // Verificar que la contraseña ingresada coincida con la contraseña hasheada almacenada
            if (!VerifyPassword(loginDto.Contrasenia, user.Contrasenia))
                throw new Exception("Credenciales inválidas");

            return user; // Devuelve el usuario autenticado si la contraseña coincide
        }

        private bool VerifyPassword(string inputPassword, string hashedPassword)
        {
            // Compara la contraseña ingresada en texto plano con la contraseña hasheada en la base de datos
            return BCrypt.Net.BCrypt.Verify(inputPassword, hashedPassword);
        }
    }
}
