using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using IELTS_PTE.Common;
using IELTS_PTE.Common.ReturnEntities;
using IELTS_PTE.Common.ReturnEntities.Reading;
using IELTS_PTE.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PTE.Business
{
    public class ReadAloudManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            SpeakingReadAloud speakingReadAloud;
            if (value.Id > 0)
            {
                speakingReadAloud = dbContext.SpeakingReadAloud.FirstOrDefault(i => i.Id == value.Id);

                if (speakingReadAloud == null)
                {
                    speakingReadAloud = new SpeakingReadAloud();
                }
            }
            else
            {
                speakingReadAloud = new SpeakingReadAloud();
            }

            speakingReadAloud.IsFree = value.IsFree;
            speakingReadAloud.ParagraghText = value.Question;
            speakingReadAloud.Questiontime = value.Timer;
            speakingReadAloud.Subject = value.Subject;
            speakingReadAloud.IsActive = value.Status;
            speakingReadAloud.UpdatedBy = "Admin";
            speakingReadAloud.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(speakingReadAloud).State = EntityState.Modified;
            }
            else
            {
                speakingReadAloud.CreatedBy = "Admin";
                speakingReadAloud.CreatedDate = DateTime.Now;
                dbContext.SpeakingReadAloud.Add(speakingReadAloud);
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

            var speakingReadAloudList = dbContext.SpeakingReadAloud.Where(i => i.IsActive == true).ToList();

            foreach (var speakingReadAloud in speakingReadAloudList)
            {
                Question question = new Question();
                question.Id = speakingReadAloud.Id;
                question.QuestionName = speakingReadAloud.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = speakingReadAloud.Id,
                    ModalId = $"fillInTheBlankEdit_{speakingReadAloud.Id}",
                    TargetId = $"#fillInTheBlankEdit_{speakingReadAloud.Id}",
                    Subject = speakingReadAloud.Subject,
                    Question = speakingReadAloud.ParagraghText,
                    Timer = (speakingReadAloud.Questiontime.HasValue) ? speakingReadAloud.Questiontime.Value : 0,
                    IsFree = (speakingReadAloud.IsFree.HasValue) ? speakingReadAloud.IsFree.Value : false,
                    Status = (speakingReadAloud.IsActive.HasValue) ? speakingReadAloud.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(speakingReadAloud);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private FillInBlanks GetFullQuestion(SpeakingReadAloud speakingRepeatSentence)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = speakingRepeatSentence?.Questiontime ?? 0;

            return fillInBlanks;
        }

        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var speakingReadAloud = dbContext.SpeakingReadAloud.FirstOrDefault(i => i.Id == id);

            if (speakingReadAloud == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = speakingReadAloud.Id,
                Subject = speakingReadAloud.Subject,
                IsFree = (speakingReadAloud.IsFree.HasValue) ? speakingReadAloud.IsFree.Value : false,
                Question = speakingReadAloud.ParagraghText,
                Status = (speakingReadAloud.IsActive.HasValue) ? speakingReadAloud.IsActive.Value : false,
                Timer = (speakingReadAloud.Questiontime.HasValue) ? speakingReadAloud.Questiontime.Value : 0
            };

            return question;
        }

    }
}
