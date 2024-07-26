using Data_Access_Layer.DTO;
using Data_Access_Layer.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Business_Layer.Data_Logic
{
    public class AdminLogin : IAdminLogin
    {
        private readonly CarDBContext _dbContext;

        public AdminLogin(CarDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AdminLoginUser> AuthenticateAsync(AdminDTO adminDto)
        {
            var adminUser = await _dbContext.AdminLoginUser.FirstOrDefaultAsync(u => u.Email == adminDto.Email && u.Password == adminDto.Password);

            return adminUser;
        }
    }
}
