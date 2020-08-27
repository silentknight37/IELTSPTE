using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Net.Sockets;
using System.Text;

namespace IELTS_PTE.Common
{
    public class SendMessage
    {
        public static void Send(MailMessage mailMessage)
        {
            try
            {
                
                SmtpClient smtp = new SmtpClient("smtp.gmail.com");
                smtp.Port = 587;
                //smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("ieltsptetest@gmail.com", "Pte2019#");
                //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(mailMessage);
            }
            catch (Exception e) {
                throw e;
            }
        }

    }
}