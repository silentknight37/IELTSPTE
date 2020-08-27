using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Mail;
using static IELTS_PTE.Common.Enum;
using IELTS_PTE.DataAccess;
using System.Linq;
using Microsoft.Extensions.Options;

namespace IELTS_PTE.Common
{

    public class EmailService
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();

        private const string FromEmail = "ieltsptetest@gmail.com";

        private IOptions<AppSettingsModel> _settings;

        
        public  EmailService(IOptions<AppSettingsModel> settings)
        {
            this._settings = settings;
        }


        public void SendEmail(string toEmailAddress, string firstName, EnumEmailBody emailSendPosition)
        {
            Send(toEmailAddress, firstName, emailSendPosition);
        }

        private  void Send(string toEmailAddress, string firstName, EnumEmailBody emailSendPosition)
        {
            switch (emailSendPosition)
            {
                case EnumEmailBody.UserAccountActivation:
                    string EmailSubject, Body;
                    GenerateEmailAccountActivation(toEmailAddress, firstName, out EmailSubject, out Body);
                    SendMessage.Send(CreateEmail(FromEmail, toEmailAddress, Body, EmailSubject));
                    break;

                case EnumEmailBody.UserAccountActivated:
                    string EmailActivatedSubject, ActivatedBody;
                    GenerateEmailAccountActivated(toEmailAddress, firstName, out EmailActivatedSubject, out ActivatedBody);
                    SendMessage.Send(CreateEmail(FromEmail, toEmailAddress, ActivatedBody, EmailActivatedSubject));
                    break;
            }
        }

        private  void GenerateEmailAccountActivation(string toEmailAddress, string firstName, out string EmailSubject, out string Body)
        {
            var user = GetUserDetails(toEmailAddress);
            EmailSubject = "Your PTE Account is Confirmed";
            string confirmationURL = _settings.Value.ApplicationHost+ "/Active/" + user.VerificationCode;
            string bodyMessage = $"<table cellpadding='0' cellspacing='0' width='100%' style='background-color:#e0e0e0;font-family:arial;padding:10px 0'><tbody><tr><td><table cellpadding='0' cellspacing='0' style='margin:0 auto;max-width:700px;width:100%;background-color:#ffffff' width='100%'><tbody><tr><td align='center' style='padding:10px 0'><h2 style='color:#FFF;'>IELTS_PTE</h2></td></tr><tr><td><table width='100%' cellpadding='0' cellspacing='0'><tbody><tr><td style='background-color:#337ab7;color:#ffffff;font-size:8px;padding:10px 0 10px 20px' colspan='2'><h1 style='margin:0;font-size: 40px;text-align: center; color:#fff'>Verify Your Account</h1></td></tr><tr><td align='center' style='padding:35px 0;background-color:#f8f8f8' colspan='2'><table cellpadding='0' cellspacing='0' width='500px' style='padding:50px'><tbody><tr><td style='color:#606060;font-size:14px;padding-bottom:8px'>Name</td><td style='color:#303030;font-size:14px;padding-bottom:8px'>{firstName}</td></tr><tr><td style='color:#606060;font-size:14px;padding-bottom:8px'>Email Address</td><td style='color:#303030;font-size:14px;padding-bottom:8px'>{toEmailAddress}</td></tr></tbody></table></td></tr><tr><td align='center' style='padding:35px 0 10px 0' ><table><tbody><tr><td align='center' style='padding:50px 100px' colspan='2'><a href='{confirmationURL}' style='padding: 20px 100px;background-color: #337ab7;color: #fff;border: 1px solid;border-radius: 30px;'>Verify</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td><table width='100%' cellpadding='0' cellspacing='0' style='padding:25px 0'><tbody><tr><td align='center' style='padding:0 20px'><span style='color:#303030;font-size:12px;line-height:18px'>Team PTE<br> Email: <a href='mailto:support@pte.lk' target='_blank'>support@pte.lk</a></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>";
            Body = string.Format(bodyMessage, toEmailAddress);
        }

        private  void GenerateEmailAccountActivated(string toEmailAddress, string firstName, out string EmailSubject, out string Body)
        {
            var user = GetUserDetails(toEmailAddress);
            EmailSubject = "Your PTE Account is Confirmed !";
            string bodyMessage = $"<table cellpadding='0' cellspacing='0' width='100%' style='background-color:#e0e0e0;font-family:arial;padding:10px 0'><tbody><tr><td><table cellpadding='0' cellspacing='0' style='margin:0 auto;max-width:700px;width:100%;background-color:#ffffff' width='100%'><tbody><tr><td align='center' style='padding:10px 0'><h2 style='color:#FFF;'>IELTS_PTE</h2></td></tr><tr><td><table width='100%' cellpadding='0' cellspacing='0'><tbody><tr><td style='background-color:#337ab7;color:#ffffff;font-size:8px;padding:10px 0 10px 20px' colspan='2'><h1 style='margin:0;font-size: 40px;text-align: center; color:#fff'>Your Account has been activated</h1></td></tr><tr><td align='center' style='padding:35px 0;background-color:#f8f8f8' colspan='2'><table cellpadding='0' cellspacing='0' width='500px' style='padding:50px'><tbody><tr><td style='color:#606060;font-size:14px;padding-bottom:8px'>Name</td><td style='color:#303030;font-size:14px;padding-bottom:8px'>{firstName}</td></tr><tr><td style='color:#606060;font-size:14px;padding-bottom:8px'>Email Address</td><td style='color:#303030;font-size:14px;padding-bottom:8px'>{toEmailAddress}</td></tr></tbody></table></td></tr><tr><td align='center' style='padding:35px 0 10px 0' ><table><tbody><tr><td align='center' style='padding:50px 100px' colspan='2'></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td><table width='100%' cellpadding='0' cellspacing='0' style='padding:25px 0'><tbody><tr><td align='center' style='padding:0 20px'><span style='color:#303030;font-size:12px;line-height:18px'>Team PTE<br> Email: <a href='mailto:support@pte.lk' target='_blank'>support@pte.lk</a></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>";
            Body = string.Format(bodyMessage, toEmailAddress);
        }

        private ApplicationUser GetUserDetails(string emailAddress)
        {
            ApplicationUser user = dbContext.ApplicationUser.Where(x => x.Email == emailAddress).FirstOrDefault();

            return user;
        }

        public  MailMessage CreateEmail(string fromEmail, string toEmail, string body, string subject)
        {
            MailMessage mailMessage = new MailMessage(FromEmail, toEmail);
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = body;

            return mailMessage;

        }
    }
}