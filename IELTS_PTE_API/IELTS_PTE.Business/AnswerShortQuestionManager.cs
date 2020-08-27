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
    public class AnswerShortQuestionManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            SpeakingAnswerShort speakingAnswerShort;
            if (value.Id > 0)
            {
                speakingAnswerShort = dbContext.SpeakingAnswerShort.FirstOrDefault(i => i.Id == value.Id);

                if (speakingAnswerShort == null)
                {
                    speakingAnswerShort = new SpeakingAnswerShort();
                }
            }
            else
            {
                speakingAnswerShort = new SpeakingAnswerShort();
            }

            speakingAnswerShort.IsFree = value.IsFree;
            speakingAnswerShort.ParagraghText = value.Question;
            speakingAnswerShort.Questiontime = value.Timer;
            speakingAnswerShort.Subject = value.Subject;
            speakingAnswerShort.IsActive = value.Status;
            speakingAnswerShort.UpdatedBy = "Admin";
            speakingAnswerShort.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(speakingAnswerShort).State = EntityState.Modified;
            }
            else
            {
                speakingAnswerShort.CreatedBy = "Admin";
                speakingAnswerShort.CreatedDate = DateTime.Now;
                dbContext.SpeakingAnswerShort.Add(speakingAnswerShort);
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

            var speakingAnswerShortList = dbContext.SpeakingAnswerShort.Where(i => i.IsActive == true).ToList();

            foreach (var speakingAnswerShort in speakingAnswerShortList)
            {
                Question question = new Question();
                question.Id = speakingAnswerShort.Id;
                question.QuestionName = speakingAnswerShort.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = speakingAnswerShort.Id,
                    ModalId = $"fillInTheBlankEdit_{speakingAnswerShort.Id}",
                    TargetId = $"#fillInTheBlankEdit_{speakingAnswerShort.Id}",
                    Subject = speakingAnswerShort.Subject,
                    Question = GetQuestion(speakingAnswerShort.ParagraghText),
                    Timer = (speakingAnswerShort.Questiontime.HasValue) ? speakingAnswerShort.Questiontime.Value : 0,
                    IsFree = (speakingAnswerShort.IsFree.HasValue) ? speakingAnswerShort.IsFree.Value : false,
                    Status = (speakingAnswerShort.IsActive.HasValue) ? speakingAnswerShort.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(speakingAnswerShort);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private FillInBlanks GetFullQuestion(SpeakingAnswerShort speakingAnswerShort)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = speakingAnswerShort?.Questiontime ?? 0;
            fillInBlanks.answers.Add(GetCorrectAnswer(speakingAnswerShort.ParagraghText));
            return fillInBlanks;
        }

        private string GetCorrectAnswer(string paraText)
        {
            StringBuilder sb = new StringBuilder();
            int index = 1;
            string answer = string.Empty;
            foreach (var item in paraText)
            {
                switch (item)
                {
                    case '[':
                    {
                        sb = new StringBuilder();
                        continue;
                    }

                    case ']':
                    {
                        answer= sb.ToString();
                        break;
                    }

                    default:
                    {
                        sb.Append(item);
                        continue;
                    }
                }
            }

            return answer;
        }

        private string GetQuestion(string paraText)
        {
            StringBuilder sb = new StringBuilder();
            int index = 1;
            string question = string.Empty;
            foreach (var item in paraText)
            {
                switch (item)
                {
                    case '[':
                    {
                        question = sb.ToString();
                        break;
                    }

                    default:
                    {
                        sb.Append(item);
                        continue;
                    }
                }
            }

            return question;
        }

        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var speakingAnswerShort = dbContext.SpeakingAnswerShort.FirstOrDefault(i => i.Id == id);

            if (speakingAnswerShort == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = speakingAnswerShort.Id,
                Subject = speakingAnswerShort.Subject,
                IsFree = (speakingAnswerShort.IsFree.HasValue) ? speakingAnswerShort.IsFree.Value : false,
                Question = speakingAnswerShort.ParagraghText,
                Status = (speakingAnswerShort.IsActive.HasValue) ? speakingAnswerShort.IsActive.Value : false,
                Timer = (speakingAnswerShort.Questiontime.HasValue) ? speakingAnswerShort.Questiontime.Value : 0
            };

            return question;
        }

    }
}
