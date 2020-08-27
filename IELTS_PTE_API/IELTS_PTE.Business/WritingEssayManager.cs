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
    public class Writing_EssayManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            WritingEssay writingEssay;
            if (value.Id > 0)
            {
                writingEssay = dbContext.WritingEssay.FirstOrDefault(i => i.Id == value.Id);

                if (writingEssay == null)
                {
                    writingEssay = new WritingEssay();
                }
            }
            else
            {
                writingEssay = new WritingEssay();
            }

            writingEssay.IsFree = value.IsFree;
            writingEssay.ParagraghText = value.Question;
            writingEssay.QuestionSummary = value.QuestionSummary;
            writingEssay.Questiontime = value.Timer;
            writingEssay.Subject = value.Subject;
            writingEssay.IsActive = value.Status;
            writingEssay.UpdatedBy = "Admin";
            writingEssay.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(writingEssay).State = EntityState.Modified;
            }
            else
            {
                writingEssay.CreatedBy = "Admin";
                writingEssay.CreatedDate = DateTime.Now;
                dbContext.WritingEssay.Add(writingEssay);
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

            var writingEssaies = dbContext.WritingEssay.Where(i => i.IsActive == true).ToList();

            foreach (var writingEssay in writingEssaies)
            {
                Question question = new Question();
                question.Id = writingEssay.Id;
                question.QuestionName = writingEssay.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = writingEssay.Id,
                    ModalId = $"fillInTheBlankEdit_{writingEssay.Id}",
                    TargetId = $"#fillInTheBlankEdit_{writingEssay.Id}",
                    Subject = writingEssay.Subject,
                    Question = writingEssay.ParagraghText,
                    QuestionSummary=writingEssay.QuestionSummary,
                    Timer = (writingEssay.Questiontime.HasValue) ? writingEssay.Questiontime.Value : 0,
                    IsFree = (writingEssay.IsFree.HasValue) ? writingEssay.IsFree.Value : false,
                    Status = (writingEssay.IsActive.HasValue) ? writingEssay.IsActive.Value : false
                };

                
                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        
        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var writingEssay = dbContext.WritingEssay.FirstOrDefault(i => i.Id == id);

            if (writingEssay == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = writingEssay.Id,
                Subject = writingEssay.Subject,
                IsFree = (writingEssay.IsFree.HasValue) ? writingEssay.IsFree.Value : false,
                Question = writingEssay.ParagraghText,
                Status = (writingEssay.IsActive.HasValue) ? writingEssay.IsActive.Value : false,
                Timer = (writingEssay.Questiontime.HasValue) ? writingEssay.Questiontime.Value : 0
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

            string subject = $"Review Writing Essay - Kevin Perera - {value.ReviewQuestion}";

            MailMessage mailMessage = new MailMessage(fromEmail, toEmail);
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = body;

            return mailMessage;

        }

    }
}
