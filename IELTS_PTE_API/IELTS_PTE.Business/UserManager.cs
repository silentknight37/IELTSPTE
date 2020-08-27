using IELTS_PTE.DataAccess;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IELTS_PTE.Common;
using static IELTS_PTE.Common.Enum;


namespace IELTS_PTE.Business
{
    public class UserManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();

        public JsonReturn SaveUser(ApplicationUser applicationUser)
        {
            //set Active Code
            int activeCode = Guid.NewGuid().GetHashCode();
            applicationUser.VerificationCode = activeCode.ToString();

            dbContext.ApplicationUser.Add(applicationUser);
            dbContext.SaveChanges();           

            return new JsonReturn
            {
                IsSuccess = true,
                Message = "Data Save Successfully"
            };

        }
    }
}
