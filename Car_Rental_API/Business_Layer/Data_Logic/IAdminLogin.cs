using Data_Access_Layer.DTO;
using Data_Access_Layer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Data_Logic
{
    public interface IAdminLogin
    {
        Task<AdminLoginUser> AuthenticateAsync(AdminDTO adminDto);
    }
}
