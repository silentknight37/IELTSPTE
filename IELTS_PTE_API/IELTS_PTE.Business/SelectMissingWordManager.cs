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
    public class SelectMissingWordManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ListeningSelectMissingWord listeningSelectMissingWord;
            if (value.Id > 0)
            {
                listeningSelectMissingWord = dbContext.ListeningSelectMissingWord.FirstOrDefault(i => i.Id == value.Id);

                if (listeningSelectMissingWord == null)
                {
                    listeningSelectMissingWord = new ListeningSelectMissingWord();
                }
            }
            else
            {
                listeningSelectMissingWord = new ListeningSelectMissingWord();
            }

            listeningSelectMissingWord.IsFree = value.IsFree;
            listeningSelectMissingWord.ParagraghText = value.Question;
            listeningSelectMissingWord.Questiontime = value.Timer;
            listeningSelectMissingWord.Subject = value.Subject;
            listeningSelectMissingWord.IsActive = value.Status;
            listeningSelectMissingWord.UpdatedBy = "Admin";
            listeningSelectMissingWord.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(listeningSelectMissingWord).State = EntityState.Modified;
            }
            else
            {
                listeningSelectMissingWord.CreatedBy = "Admin";
                listeningSelectMissingWord.CreatedDate = DateTime.Now;
                dbContext.ListeningSelectMissingWord.Add(listeningSelectMissingWord);
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

            var ListeningSelectMissingWords = dbContext.ListeningSelectMissingWord.Where(i => i.IsActive == true).ToList();

            foreach (var listeningSelectMissingWord in ListeningSelectMissingWords)
            {
                Question question = new Question();
                question.Id = listeningSelectMissingWord.Id;
                question.QuestionName = listeningSelectMissingWord.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = listeningSelectMissingWord.Id,
                    ModalId = $"fillInTheBlankEdit_{listeningSelectMissingWord.Id}",
                    TargetId = $"#fillInTheBlankEdit_{listeningSelectMissingWord.Id}",
                    Subject = listeningSelectMissingWord.Subject,
                    //Question = GetText(listeningHighlightCorrectSummary.ParagraghText),
                    Timer = (listeningSelectMissingWord.Questiontime.HasValue) ? listeningSelectMissingWord.Questiontime.Value : 0,
                    IsFree = (listeningSelectMissingWord.IsFree.HasValue) ? listeningSelectMissingWord.IsFree.Value : false,
                    Status = (listeningSelectMissingWord.IsActive.HasValue) ? listeningSelectMissingWord.IsActive.Value : false
                };

                GetFullQuestion(listeningSelectMissingWord, question);

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

        private void GetFullQuestion(ListeningSelectMissingWord listeningSelectMissingWord, Question question)
        {
            question.FullQuestion = new FillInBlanks();
            question.FullQuestion.timer = listeningSelectMissingWord?.Questiontime ?? 0;
            
            GetCorrectAnswersAndDisplayQuestion(question.FullQuestion.qestion, listeningSelectMissingWord.ParagraghText, question);
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
            var listeningSelectMissingWord = dbContext.ListeningSelectMissingWord.FirstOrDefault(i => i.Id == id);

            if (listeningSelectMissingWord == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = listeningSelectMissingWord.Id,
                Subject = listeningSelectMissingWord.Subject,
                IsFree = (listeningSelectMissingWord.IsFree.HasValue) ? listeningSelectMissingWord.IsFree.Value : false,
                Question = listeningSelectMissingWord.ParagraghText,
                Status = (listeningSelectMissingWord.IsActive.HasValue) ? listeningSelectMissingWord.IsActive.Value : false,
                Timer = (listeningSelectMissingWord.Questiontime.HasValue) ? listeningSelectMissingWord.Questiontime.Value : 0
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
