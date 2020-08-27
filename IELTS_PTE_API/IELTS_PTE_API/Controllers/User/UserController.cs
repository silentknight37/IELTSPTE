using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IELTS_PTE.Business;
using IELTS_PTE.Common;
using IELTS_PTE.DataAccess;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IELTS_PTE_API.Controllers.User
{
    
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager _userRegistration = new UserManager();
       
        // POST api/<controller>
        [HttpPost]
        [Route("api/User/Register")]
        public JsonReturn Post([FromBody] ApplicationUser value)
        {
            var response = new JsonReturn();
            if (value == null)
            {
                response.IsSuccess = false;
                response.Message = "Cannot Save Empty User";
            }
            else
            {
                response = _userRegistration.SaveUser(value);
            }

            return response;
        }      
    }
}
