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
    public class HighlightCorrectSummaryManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ListeningHighlightCorrectSummary listeningHighlightCorrectSummary;
            if (value.Id > 0)
            {
                listeningHighlightCorrectSummary = dbContext.ListeningHighlightCorrectSummary.FirstOrDefault(i => i.Id == value.Id);

                if (listeningHighlightCorrectSummary == null)
                {
                    listeningHighlightCorrectSummary = new ListeningHighlightCorrectSummary();
                }
            }
            else
            {
                listeningHighlightCorrectSummary = new ListeningHighlightCorrectSummary();
            }

            listeningHighlightCorrectSummary.IsFree = value.IsFree;
            listeningHighlightCorrectSummary.ParagraghText = value.Question;
            listeningHighlightCorrectSummary.Questiontime = value.Timer;
            listeningHighlightCorrectSummary.Subject = value.Subject;
            listeningHighlightCorrectSummary.IsActive = value.Status;
            listeningHighlightCorrectSummary.UpdatedBy = "Admin";
            listeningHighlightCorrectSummary.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(listeningHighlightCorrectSummary).State = EntityState.Modified;
            }
            else
            {
                listeningHighlightCorrectSummary.CreatedBy = "Admin";
                listeningHighlightCorrectSummary.CreatedDate = DateTime.Now;
                dbContext.ListeningHighlightCorrectSummary.Add(listeningHighlightCorrectSummary);
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

            var listeningHighlightCorrectSummaries = dbContext.ListeningHighlightCorrectSummary.Where(i => i.IsActive == true).ToList();

            foreach (var listeningHighlightCorrectSummary in listeningHighlightCorrectSummaries)
            {
                Question question = new Question();
                question.Id = listeningHighlightCorrectSummary.Id;
                question.QuestionName = listeningHighlightCorrectSummary.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = listeningHighlightCorrectSummary.Id,
                    ModalId = $"fillInTheBlankEdit_{listeningHighlightCorrectSummary.Id}",
                    TargetId = $"#fillInTheBlankEdit_{listeningHighlightCorrectSummary.Id}",
                    Subject = listeningHighlightCorrectSummary.Subject,
                    //Question = GetText(listeningHighlightCorrectSummary.ParagraghText),
                    Timer = (listeningHighlightCorrectSummary.Questiontime.HasValue) ? listeningHighlightCorrectSummary.Questiontime.Value : 0,
                    IsFree = (listeningHighlightCorrectSummary.IsFree.HasValue) ? listeningHighlightCorrectSummary.IsFree.Value : false,
                    Status = (listeningHighlightCorrectSummary.IsActive.HasValue) ? listeningHighlightCorrectSummary.IsActive.Value : false
                };

                GetFullQuestion(listeningHighlightCorrectSummary, question);

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

        private void GetFullQuestion(ListeningHighlightCorrectSummary listeningHighlightCorrectSummary, Question question)
        {
            question.FullQuestion = new FillInBlanks();
            question.FullQuestion.timer = listeningHighlightCorrectSummary?.Questiontime ?? 0;
            
            GetCorrectAnswersAndDisplayQuestion(question.FullQuestion.qestion, listeningHighlightCorrectSummary.ParagraghText, question);
        }

        private void GetCorrectAnswersAndDisplayQuestion( List<RequestText> questions, string paraText, Question question)
        {
            StringBuilder sb = new StringBuilder();
            int index = 1;
            foreach (var item in paraText)
            {
                switch (item)
                {
                    case '[':
                    {
                        if (question.QuestionDetails.Question == null)
                        {
                            question.QuestionDetails.Question = sb.ToString();
                            continue;
                        }

                        sb = new StringBuilder();
                        continue;
                    }

                    case ']':
                    {
                        if (sb.ToString() == string.Empty)
                        {
                            sb = new StringBuilder();
                            continue;
                        }

                        if (!questions.Any())
                        {
                            RequestText displayText = new RequestText
                            {
                                text = sb.ToString(),
                                textType = 2,
                                requestAnswer = new Answers
                                {
                                    id = index,
                                    isRemove = false,
                                    selectAnswer = "",
                                    correctAnswer = sb.ToString()
                                }
                            };

                            questions.Add(displayText);
                        }
                        else
                        {
                            RequestText displayText = new RequestText
                            {
                                text = sb.ToString(),
                                textType = 2,
                                requestAnswer = new Answers
                                {
                                    id = index,
                                    isRemove = false,
                                    selectAnswer = "",
                                    correctAnswer = ""
                                }
                            };

                            questions.Add(displayText);
                        }
                        
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

            Shuffle(questions);
        }
        

        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var listeningHighlightCorrectSummary = dbContext.ListeningHighlightCorrectSummary.FirstOrDefault(i => i.Id == id);

            if (listeningHighlightCorrectSummary == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = listeningHighlightCorrectSummary.Id,
                Subject = listeningHighlightCorrectSummary.Subject,
                IsFree = (listeningHighlightCorrectSummary.IsFree.HasValue) ? listeningHighlightCorrectSummary.IsFree.Value : false,
                Question = listeningHighlightCorrectSummary.ParagraghText,
                Status = (listeningHighlightCorrectSummary.IsActive.HasValue) ? listeningHighlightCorrectSummary.IsActive.Value : false,
                Timer = (listeningHighlightCorrectSummary.Questiontime.HasValue) ? listeningHighlightCorrectSummary.Questiontime.Value : 0
            };

            return question;
        }

        private void Shuffle<T>(IList<T> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }

    }
}
