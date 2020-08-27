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
    public class ListeningSingleChoiceManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ListeningListeningSingleChoice listeningListeningSingleChoice;
            if (value.Id > 0)
            {
                listeningListeningSingleChoice = dbContext.ListeningListeningSingleChoice.FirstOrDefault(i => i.Id == value.Id);

                if(listeningListeningSingleChoice == null)
                {
                    listeningListeningSingleChoice = new ListeningListeningSingleChoice();
                }
            }
            else
            {
                listeningListeningSingleChoice = new ListeningListeningSingleChoice();
            }

            listeningListeningSingleChoice.IsFree = value.IsFree;
            listeningListeningSingleChoice.ParagraghText = value.Question;
            listeningListeningSingleChoice.Questiontime = value.Timer;
            listeningListeningSingleChoice.Subject = value.Subject;
            listeningListeningSingleChoice.IsActive = value.Status;
            listeningListeningSingleChoice.UpdatedBy = "Admin";
            listeningListeningSingleChoice.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(listeningListeningSingleChoice).State = EntityState.Modified;
            }
            else
            {
                listeningListeningSingleChoice.CreatedBy = "Admin";
                listeningListeningSingleChoice.CreatedDate = DateTime.Now;
                dbContext.ListeningListeningSingleChoice.Add(listeningListeningSingleChoice);
            }

            dbContext.SaveChanges();
            return new JsonReturn
            {
                IsSuccess = true,
                Message = "Data Save Successfully"
            };
        }

        public QuestionsForSelect GetQuestions()
        {
            QuestionsForSelect questions = new QuestionsForSelect();
            List<QuestionForSelect> questionList = new List<QuestionForSelect>();

            var listeningListeningSingleChoiceList = dbContext.ListeningListeningSingleChoice.Where(i => i.IsActive == true).ToList();

            foreach (var listeningListeningSingleChoice in listeningListeningSingleChoiceList)
            {
                QuestionForSelect question = new QuestionForSelect();
                question.Id = listeningListeningSingleChoice.Id;
                question.QuestionName = listeningListeningSingleChoice.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = listeningListeningSingleChoice.Id,
                    ModalId = $"listeningListeningSingleChoiceEdit_{listeningListeningSingleChoice.Id}",
                    TargetId = $"#listeningListeningSingleChoiceEdit_{listeningListeningSingleChoice.Id}",
                    Subject = listeningListeningSingleChoice.Subject,
                    Question = listeningListeningSingleChoice.ParagraghText,
                    Timer = (listeningListeningSingleChoice.Questiontime.HasValue) ? listeningListeningSingleChoice.Questiontime.Value : 0,
                    IsFree = (listeningListeningSingleChoice.IsFree.HasValue) ? listeningListeningSingleChoice.IsFree.Value : false,
                    Status = (listeningListeningSingleChoice.IsActive.HasValue) ? listeningListeningSingleChoice.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(listeningListeningSingleChoice);
                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private SelectChoiceQuestions GetFullQuestion(ListeningListeningSingleChoice listeningListeningSingleChoice)
        {
            SelectChoiceQuestions selectChoice = new SelectChoiceQuestions();
            selectChoice.timer = listeningListeningSingleChoice?.Questiontime ?? 0;

            GetCorrectAnswersAndDisplayQuestion(selectChoice.qestion, listeningListeningSingleChoice.ParagraghText);

            return selectChoice;
        }

        private void GetCorrectAnswersAndDisplayQuestion(List<RequestTextForSelectChoice> question, string paraText)
        {
            StringBuilder sb = new StringBuilder();
            List<string> correctAnswers = new List<string>();
            List<string> allAnswers = new List<string>();
            bool isCorrectAnswers = false;
            bool isQuestion = true;
            RequestTextForSelectChoice displayAnswerText = new RequestTextForSelectChoice { text = "q", textType = 2, requestAnswer=new List<AnswersForSelectChoice>() };
            int index = 1;
            foreach (var item in paraText)
            {
                switch (item)
                {
                    case '[':
                        {
                            isQuestion = false;
                            if (sb.Length > 0)
                            {
                                RequestTextForSelectChoice displayText = new RequestTextForSelectChoice
                                {
                                    text = sb.ToString(),
                                    textType = 1
                                };

                                question.Add(displayText);
                            }
                            sb = new StringBuilder();
                            isCorrectAnswers = true;
                            continue;
                        }
                    case ',':
                        {
                            if (!isQuestion && sb.Length>0)
                            {
                                if (isCorrectAnswers)
                                {
                                    displayAnswerText.requestAnswer.Add(new AnswersForSelectChoice
                                    {
                                        id = index,
                                        isCorrectAnswers = true,
                                        answerText = sb.ToString()
                                    });
                                }
                                else
                                {
                                    displayAnswerText.requestAnswer.Add(new AnswersForSelectChoice
                                    {
                                        id = index,
                                        isCorrectAnswers = false,
                                        answerText = sb.ToString()
                                    });
                                }

                                index++;
                                sb = new StringBuilder();
                            }
                            continue;
                        }
                    case ']':
                        {
                            if (isCorrectAnswers)
                            {
                                displayAnswerText.requestAnswer.Add(new AnswersForSelectChoice
                                {
                                    id = index,
                                    isCorrectAnswers = true,
                                    answerText = sb.ToString()
                                });
                            }
                            else
                            {
                                displayAnswerText.requestAnswer.Add(new AnswersForSelectChoice
                                {
                                    id = index,
                                    isCorrectAnswers = false,
                                    answerText = sb.ToString()
                                });
                            }
                            isCorrectAnswers = false;
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

            if (displayAnswerText.requestAnswer.Any())
            {
                Shuffle(displayAnswerText.requestAnswer);
                question.Add(displayAnswerText);
            }

            if (sb.ToString().Length > 0)
            {
                RequestTextForSelectChoice displayText = new RequestTextForSelectChoice
                {
                    text = sb.ToString(),
                    textType = 1
                };

                question.Add(displayText);
            }
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
        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var readingReadingMultipleChoice = dbContext.ReadingReadingMultipleChoice.FirstOrDefault(i => i.Id == id);

            if (readingReadingMultipleChoice == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = readingReadingMultipleChoice.Id,
                Subject = readingReadingMultipleChoice.Subject,
                IsFree = (readingReadingMultipleChoice.IsFree.HasValue) ? readingReadingMultipleChoice.IsFree.Value : false,
                Question = readingReadingMultipleChoice.ParagraghText,
                Status = (readingReadingMultipleChoice.IsActive.HasValue) ? readingReadingMultipleChoice.IsActive.Value : false,
                Timer = (readingReadingMultipleChoice.Questiontime.HasValue) ? readingReadingMultipleChoice.Questiontime.Value : 0
            };

            return question;
        }
    }
}
