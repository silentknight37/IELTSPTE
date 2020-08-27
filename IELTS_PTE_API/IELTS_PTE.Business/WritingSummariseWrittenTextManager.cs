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
    public class Writing_SummariseWrittenText
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            WritingSummariseWrittenText writingSummariseWrittenText;
            if (value.Id > 0)
            {
                writingSummariseWrittenText = dbContext.WritingSummariseWrittenText.FirstOrDefault(i => i.Id == value.Id);

                if (writingSummariseWrittenText == null)
                {
                    writingSummariseWrittenText = new WritingSummariseWrittenText();
                }
            }
            else
            {
                writingSummariseWrittenText = new WritingSummariseWrittenText();
            }

            writingSummariseWrittenText.IsFree = value.IsFree;
            writingSummariseWrittenText.ParagraghText = value.Question;
            writingSummariseWrittenText.QuestionSummary = value.QuestionSummary;
            writingSummariseWrittenText.Questiontime = value.Timer;
            writingSummariseWrittenText.Subject = value.Subject;
            writingSummariseWrittenText.IsActive = value.Status;
            writingSummariseWrittenText.UpdatedBy = "Admin";
            writingSummariseWrittenText.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(writingSummariseWrittenText).State = EntityState.Modified;
            }
            else
            {
                writingSummariseWrittenText.CreatedBy = "Admin";
                writingSummariseWrittenText.CreatedDate = DateTime.Now;
                dbContext.WritingSummariseWrittenText.Add(writingSummariseWrittenText);
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

            var writingSummariseWrittenTexts = dbContext.WritingSummariseWrittenText.Where(i => i.IsActive == true).ToList();

            foreach (var writingSummariseWrittenText in writingSummariseWrittenTexts)
            {
                Question question = new Question();
                question.Id = writingSummariseWrittenText.Id;
                question.QuestionName = writingSummariseWrittenText.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = writingSummariseWrittenText.Id,
                    ModalId = $"fillInTheBlankEdit_{writingSummariseWrittenText.Id}",
                    TargetId = $"#fillInTheBlankEdit_{writingSummariseWrittenText.Id}",
                    Subject = writingSummariseWrittenText.Subject,
                    Question = writingSummariseWrittenText.ParagraghText,
                    QuestionSummary=writingSummariseWrittenText.QuestionSummary,
                    Timer = (writingSummariseWrittenText.Questiontime.HasValue) ? writingSummariseWrittenText.Questiontime.Value : 0,
                    IsFree = (writingSummariseWrittenText.IsFree.HasValue) ? writingSummariseWrittenText.IsFree.Value : false,
                    Status = (writingSummariseWrittenText.IsActive.HasValue) ? writingSummariseWrittenText.IsActive.Value : false
                };

                
                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        
        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var writingSummariseWrittenText = dbContext.WritingSummariseWrittenText.FirstOrDefault(i => i.Id == id);

            if (writingSummariseWrittenText == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = writingSummariseWrittenText.Id,
                Subject = writingSummariseWrittenText.Subject,
                IsFree = (writingSummariseWrittenText.IsFree.HasValue) ? writingSummariseWrittenText.IsFree.Value : false,
                Question = writingSummariseWrittenText.ParagraghText,
                Status = (writingSummariseWrittenText.IsActive.HasValue) ? writingSummariseWrittenText.IsActive.Value : false,
                Timer = (writingSummariseWrittenText.Questiontime.HasValue) ? writingSummariseWrittenText.Questiontime.Value : 0
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

            string subject = $"Review Summaries Written Text - Kevin Perera - {value.ReviewQuestion}";

            MailMessage mailMessage = new MailMessage(fromEmail, toEmail);
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = body;

            return mailMessage;

        }

    }
}
