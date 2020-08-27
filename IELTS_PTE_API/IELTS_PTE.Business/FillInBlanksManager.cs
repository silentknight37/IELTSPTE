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
    public class FillInBlanksManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ListeningFillInBlanks listeningFillInBlanks;
            if (value.Id > 0)
            {
                listeningFillInBlanks = dbContext.ListeningFillInBlanks.FirstOrDefault(i => i.Id == value.Id);

                if (listeningFillInBlanks == null)
                {
                    listeningFillInBlanks = new ListeningFillInBlanks();
                }
            }
            else
            {
                listeningFillInBlanks = new ListeningFillInBlanks();
            }

            listeningFillInBlanks.IsFree = value.IsFree;
            listeningFillInBlanks.ParagraghText = value.Question;
            listeningFillInBlanks.Questiontime = value.Timer;
            listeningFillInBlanks.Subject = value.Subject;
            listeningFillInBlanks.IsActive = value.Status;
            listeningFillInBlanks.UpdatedBy = "Admin";
            listeningFillInBlanks.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(listeningFillInBlanks).State = EntityState.Modified;
            }
            else
            {
                listeningFillInBlanks.CreatedBy = "Admin";
                listeningFillInBlanks.CreatedDate = DateTime.Now;
                dbContext.ListeningFillInBlanks.Add(listeningFillInBlanks);
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

            var listeningFillInBlanks = dbContext.ListeningFillInBlanks.Where(i => i.IsActive == true).ToList();

            foreach (var ListeningFillInBlank in listeningFillInBlanks)
            {
                Question question = new Question();
                question.Id = ListeningFillInBlank.Id;
                question.QuestionName = ListeningFillInBlank.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = ListeningFillInBlank.Id,
                    ModalId = $"fillInTheBlankEdit_{ListeningFillInBlank.Id}",
                    TargetId = $"#fillInTheBlankEdit_{ListeningFillInBlank.Id}",
                    Subject = ListeningFillInBlank.Subject,
                    Question = GetText(ListeningFillInBlank.ParagraghText),
                    Timer = (ListeningFillInBlank.Questiontime.HasValue) ? ListeningFillInBlank.Questiontime.Value : 0,
                    IsFree = (ListeningFillInBlank.IsFree.HasValue) ? ListeningFillInBlank.IsFree.Value : false,
                    Status = (ListeningFillInBlank.IsActive.HasValue) ? ListeningFillInBlank.IsActive.Value : false
                };

                question.FullQuestion = GetFullQuestion(ListeningFillInBlank);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private string GetText(string text)
        {
            string questionText = text.Replace("[",string.Empty);
            questionText = questionText.Replace("]", string.Empty);

            return questionText;
        }

        private FillInBlanks GetFullQuestion(ListeningFillInBlanks listeningFillInBlank)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = listeningFillInBlank?.Questiontime ?? 0;
            
            GetCorrectAnswersAndDisplayQuestion( fillInBlanks.qestion, listeningFillInBlank.ParagraghText);

            return fillInBlanks;
        }

        private void GetCorrectAnswersAndDisplayQuestion( List<RequestText> question, string paraText)
        {
            StringBuilder sb = new StringBuilder();
            int index = 1;
            foreach (var item in paraText)
            {
                switch (item)
                {
                    case '[':
                        {
                            RequestText displayText = new RequestText
                            {
                                text = sb.ToString(),
                                textType = 1,
                                requestAnswer = new Answers
                                {
                                    id = 0,
                                    isRemove = false,
                                    selectAnswer = "",
                                    correctAnswer = ""
                                }
                            };

                            question.Add(displayText);

                            sb = new StringBuilder();
                            continue;
                        }

                    case ']':
                        {
                            RequestText displayText = new RequestText
                            {
                                text = "q",
                                textType = 2,
                                requestAnswer = new Answers
                                {
                                    id = index,
                                    isRemove = false,
                                    selectAnswer = "",
                                    correctAnswer = sb.ToString()
                                }
                            };

                            question.Add(displayText);

                            index++;
                            sb = new StringBuilder();
                            continue;
                        }

                    default:
                        {
                            sb.Append(item);
                            continue;
                        }
                }
            }

            if (sb.ToString().Length > 0)
            {
                RequestText displayText = new RequestText
                {
                    text = sb.ToString(),
                    textType = 1,
                    requestAnswer = new Answers
                    {
                        id = 0,
                        isRemove = false,
                        selectAnswer = "",
                        correctAnswer = ""
                    }
                };

                question.Add(displayText);
            }
            
        }
        

        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var listeningFillInBlanks = dbContext.ListeningFillInBlanks.FirstOrDefault(i => i.Id == id);

            if (listeningFillInBlanks == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = listeningFillInBlanks.Id,
                Subject = listeningFillInBlanks.Subject,
                IsFree = (listeningFillInBlanks.IsFree.HasValue) ? listeningFillInBlanks.IsFree.Value : false,
                Question = listeningFillInBlanks.ParagraghText,
                Status = (listeningFillInBlanks.IsActive.HasValue) ? listeningFillInBlanks.IsActive.Value : false,
                Timer = (listeningFillInBlanks.Questiontime.HasValue) ? listeningFillInBlanks.Questiontime.Value : 0
            };

            return question;
        }

    }
}
