using technical_tests_backend_ssr.DTOs;

namespace technical_tests_backend_ssr.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user, UpdateUserDto updateUserDto); 
        Task DeleteUserAsync(int id);
    }

}
