using technical_tests_backend_ssr.Services.Interfaces;
using technical_tests_backend_ssr.Repositories.Interfaces;
using BCrypt.Net; 
using technical_tests_backend_ssr.DTOs;


namespace technical_tests_backend_ssr.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            try
            {
                return await _userRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la lista de usuarios.", ex);
            }
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(id);
                if (user == null) throw new KeyNotFoundException("Usuario no encontrado.");
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el usuario.", ex);
            }
        }

        public async Task AddUserAsync(User user)
        {
            try
            {
                user.Contrasenia = HashPassword(user.Contrasenia);

                await _userRepository.AddAsync(user);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar el usuario.", ex);
            }
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public async Task UpdateUserAsync(User user, UpdateUserDto updateUserDto)
        {
            try
            {
                user.Nombre = updateUserDto.Nombre ?? user.Nombre;
                user.Apellido = updateUserDto.Apellido ?? user.Apellido;
                user.DNI = updateUserDto.DNI ?? user.DNI;
                user.Rol = updateUserDto.Rol ?? user.Rol;
                user.Usuario = updateUserDto.Usuario ?? user.Usuario;

                if (!string.IsNullOrEmpty(updateUserDto.Contrasenia))
                {
                    user.Contrasenia = HashPassword(updateUserDto.Contrasenia);
                }

                await _userRepository.UpdateAsync(user);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar el usuario.", ex);
            }
        }

        public async Task DeleteUserAsync(int id)
        {
            try
            {
                await _userRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el usuario.", ex);
            }
        }
    }
}
