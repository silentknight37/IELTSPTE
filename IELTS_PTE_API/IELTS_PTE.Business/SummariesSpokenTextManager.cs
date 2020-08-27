using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using IELTS_PTE.Common;
using IELTS_PTE.Common.ReturnEntities;
using IELTS_PTE.Common.ReturnEntities.Reading;
using IELTS_PTE.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PTE.Business
{
    public class SummariesSpokenTextManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ListeningSummariesSpokenText listeningSummariesSpokenText;
            if (value.Id > 0)
            {
                listeningSummariesSpokenText = dbContext.ListeningSummariesSpokenText.FirstOrDefault(i => i.Id == value.Id);

                if (listeningSummariesSpokenText == null)
                {
                    listeningSummariesSpokenText = new ListeningSummariesSpokenText();
                }
            }
            else
            {
                listeningSummariesSpokenText = new ListeningSummariesSpokenText();
            }

            listeningSummariesSpokenText.IsFree = value.IsFree;
            listeningSummariesSpokenText.ParagraghText = value.Question;
            listeningSummariesSpokenText.QuestionSummary = value.QuestionSummary;
            listeningSummariesSpokenText.Questiontime = value.Timer;
            listeningSummariesSpokenText.Subject = value.Subject;
            listeningSummariesSpokenText.IsActive = value.Status;
            listeningSummariesSpokenText.UpdatedBy = "Admin";
            listeningSummariesSpokenText.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(listeningSummariesSpokenText).State = EntityState.Modified;
            }
            else
            {
                listeningSummariesSpokenText.CreatedBy = "Admin";
                listeningSummariesSpokenText.CreatedDate = DateTime.Now;
                dbContext.ListeningSummariesSpokenText.Add(listeningSummariesSpokenText);
            }

            dbContext.SaveChanges();
            return new JsonReturn
            {
                Records = value,
                IsSuccess = true,
                Message = "Data Save Successfully"
            };
        }

        public Questions GetQuestions()
        {
            Questions questions = new Questions();
            List<Question> questionList = new List<Question>();

            var listeningSummariesSpokenTexts = dbContext.ListeningSummariesSpokenText.Where(i => i.IsActive == true).ToList();

            foreach (var listeningSummariesSpokenText in listeningSummariesSpokenTexts)
            {
                Question question = new Question();
                question.Id = listeningSummariesSpokenText.Id;
                question.QuestionName = listeningSummariesSpokenText.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = listeningSummariesSpokenText.Id,
                    ModalId = $"fillInTheBlankEdit_{listeningSummariesSpokenText.Id}",
                    TargetId = $"#fillInTheBlankEdit_{listeningSummariesSpokenText.Id}",
                    Subject = listeningSummariesSpokenText.Subject,
                    Question = listeningSummariesSpokenText.ParagraghText,
                    QuestionSummary=listeningSummariesSpokenText.QuestionSummary,
                    Timer = (listeningSummariesSpokenText.Questiontime.HasValue) ? listeningSummariesSpokenText.Questiontime.Value : 0,
                    IsFree = (listeningSummariesSpokenText.IsFree.HasValue) ? listeningSummariesSpokenText.IsFree.Value : false,
                    Status = (listeningSummariesSpokenText.IsActive.HasValue) ? listeningSummariesSpokenText.IsActive.Value : false
                };

                
                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        
        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var listeningSummariesSpokenText = dbContext.ListeningSummariesSpokenText.FirstOrDefault(i => i.Id == id);

            if (listeningSummariesSpokenText == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = listeningSummariesSpokenText.Id,
                Subject = listeningSummariesSpokenText.Subject,
                IsFree = (listeningSummariesSpokenText.IsFree.HasValue) ? listeningSummariesSpokenText.IsFree.Value : false,
                Question = listeningSummariesSpokenText.ParagraghText,
                Status = (listeningSummariesSpokenText.IsActive.HasValue) ? listeningSummariesSpokenText.IsActive.Value : false,
                Timer = (listeningSummariesSpokenText.Questiontime.HasValue) ? listeningSummariesSpokenText.Questiontime.Value : 0
            };

            return question;
        }

        public JsonReturn SendReview(ReviewEmail value)
        {
            JsonReturn ret =new JsonReturn();
            SendMessage.Send(CreateEmailSender(value));
            SendMessage.Send(CreateEmailReviewer(value));
            return new JsonReturn{
                IsSuccess=true,
                Message="Email Send Successfully"
            };
        }

        public MailMessage CreateEmailSender(ReviewEmail value)
        {
            var sysConfig=dbContext.SystemConfig.FirstOrDefault(i => i.Code == "EmailHost");
            string fromEmail = sysConfig!=null? sysConfig.Value:string.Empty;
            string toEmail = sysConfig != null ? sysConfig.Value : string.Empty;

            string body = $"<b>PTE will Review your question soon</b>" +
                          $"<p>User : Kevin Perera" +
                          $"<p>Question : {value.ReviewQuestion}" +
                          $"<hr>" +
                          $"<p>{value.ReviewText}</p>";

            string subject = $"Review Summaries Spoken Text - Kevin Perera - {value.ReviewQuestion}";

            MailMessage mailMessage = new MailMessage(fromEmail, toEmail);
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = body;

            return mailMessage;

        }

        public MailMessage CreateEmailReviewer(ReviewEmail value)
        {
            var sysConfig = dbContext.SystemConfig.FirstOrDefault(i => i.Code == "EmailHost");
            string fromEmail = sysConfig != null ? sysConfig.Value : string.Empty;
            string toEmail = sysConfig != null ? sysConfig.Value : string.Empty;

            string body = $"<b>Review Following Question</b>" +
                          $"<p>User : Kevin Perera" +
                          $"<p>Question : {value.ReviewQuestion}" +
                          $"<hr>" +
                          $"<p>{value.ReviewText}</p>";

            string subject = $"Review Summaries Spoken Text - Kevin Perera - {value.ReviewQuestion}";

            MailMessage mailMessage = new MailMessage(fromEmail, toEmail);
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = body;

            return mailMessage;

        }

    }
}
