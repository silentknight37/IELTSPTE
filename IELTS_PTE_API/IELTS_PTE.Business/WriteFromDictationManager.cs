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
    public class WriteFromDictationManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ListeningWriteFromDictation listeningWriteFromDictation;
            if (value.Id > 0)
            {
                listeningWriteFromDictation = dbContext.ListeningWriteFromDictation.FirstOrDefault(i => i.Id == value.Id);

                if (listeningWriteFromDictation == null)
                {
                    listeningWriteFromDictation = new ListeningWriteFromDictation();
                }
            }
            else
            {
                listeningWriteFromDictation = new ListeningWriteFromDictation();
            }

            listeningWriteFromDictation.IsFree = value.IsFree;
            listeningWriteFromDictation.ParagraghText = value.Question;
            listeningWriteFromDictation.Questiontime = value.Timer;
            listeningWriteFromDictation.Subject = value.Subject;
            listeningWriteFromDictation.IsActive = value.Status;
            listeningWriteFromDictation.UpdatedBy = "Admin";
            listeningWriteFromDictation.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(listeningWriteFromDictation).State = EntityState.Modified;
            }
            else
            {
                listeningWriteFromDictation.CreatedBy = "Admin";
                listeningWriteFromDictation.CreatedDate = DateTime.Now;
                dbContext.ListeningWriteFromDictation.Add(listeningWriteFromDictation);
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

            var listeningWriteFromDictations = dbContext.ListeningWriteFromDictation.Where(i => i.IsActive == true).ToList();

            foreach (var listeningWriteFromDictation in listeningWriteFromDictations)
            {
                Question question = new Question();
                question.Id = listeningWriteFromDictation.Id;
                question.QuestionName = listeningWriteFromDictation.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = listeningWriteFromDictation.Id,
                    ModalId = $"fillInTheBlankEdit_{listeningWriteFromDictation.Id}",
                    TargetId = $"#fillInTheBlankEdit_{listeningWriteFromDictation.Id}",
                    Subject = listeningWriteFromDictation.Subject,
                    Question = GetQuestion(listeningWriteFromDictation.ParagraghText),
                    Timer = (listeningWriteFromDictation.Questiontime.HasValue) ? listeningWriteFromDictation.Questiontime.Value : 0,
                    IsFree = (listeningWriteFromDictation.IsFree.HasValue) ? listeningWriteFromDictation.IsFree.Value : false,
                    Status = (listeningWriteFromDictation.IsActive.HasValue) ? listeningWriteFromDictation.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(listeningWriteFromDictation);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private FillInBlanks GetFullQuestion(ListeningWriteFromDictation listeningWriteFromDictation)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = listeningWriteFromDictation?.Questiontime ?? 0;
            //fillInBlanks.answers.Add(GetCorrectAnswer(listeningWriteFromDictation.ParagraghText));
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
                            answer = sb.ToString();
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
            var listeningWriteFromDictation = dbContext.ListeningWriteFromDictation.FirstOrDefault(i => i.Id == id);

            if (listeningWriteFromDictation == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = listeningWriteFromDictation.Id,
                Subject = listeningWriteFromDictation.Subject,
                IsFree = (listeningWriteFromDictation.IsFree.HasValue) ? listeningWriteFromDictation.IsFree.Value : false,
                Question = listeningWriteFromDictation.ParagraghText,
                Status = (listeningWriteFromDictation.IsActive.HasValue) ? listeningWriteFromDictation.IsActive.Value : false,
                Timer = (listeningWriteFromDictation.Questiontime.HasValue) ? listeningWriteFromDictation.Questiontime.Value : 0
            };

            return question;
        }

    }
}
