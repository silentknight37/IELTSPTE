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
    public class ListeningMultipleChoiceManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ListeningListeningMultipleChoice listeningListeningMultipleChoice;
            if (value.Id > 0)
            {
                listeningListeningMultipleChoice = dbContext.ListeningListeningMultipleChoice.FirstOrDefault(i => i.Id == value.Id);

                if(listeningListeningMultipleChoice == null)
                {
                    listeningListeningMultipleChoice = new ListeningListeningMultipleChoice();
                }
            }
            else
            {
                listeningListeningMultipleChoice = new ListeningListeningMultipleChoice();
            }

            listeningListeningMultipleChoice.IsFree = value.IsFree;
            listeningListeningMultipleChoice.ParagraghText = value.Question;
            listeningListeningMultipleChoice.Questiontime = value.Timer;
            listeningListeningMultipleChoice.Subject = value.Subject;
            listeningListeningMultipleChoice.IsActive = value.Status;
            listeningListeningMultipleChoice.UpdatedBy = "Admin";
            listeningListeningMultipleChoice.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(listeningListeningMultipleChoice).State = EntityState.Modified;
            }
            else
            {
                listeningListeningMultipleChoice.CreatedBy = "Admin";
                listeningListeningMultipleChoice.CreatedDate = DateTime.Now;
                dbContext.ListeningListeningMultipleChoice.Add(listeningListeningMultipleChoice);
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

            var listeningListeningMultipleChoiceList = dbContext.ListeningListeningMultipleChoice.Where(i => i.IsActive == true).ToList();

            foreach (var listeningListeningMultipleChoice in listeningListeningMultipleChoiceList)
            {
                QuestionForSelect question = new QuestionForSelect();
                question.Id = listeningListeningMultipleChoice.Id;
                question.QuestionName = listeningListeningMultipleChoice.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = listeningListeningMultipleChoice.Id,
                    ModalId = $"listeningListeningMultipleChoiceEdit_{listeningListeningMultipleChoice.Id}",
                    TargetId = $"#listeningListeningMultipleChoiceEdit_{listeningListeningMultipleChoice.Id}",
                    Subject = listeningListeningMultipleChoice.Subject,
                    Question = listeningListeningMultipleChoice.ParagraghText,
                    Timer = (listeningListeningMultipleChoice.Questiontime.HasValue) ? listeningListeningMultipleChoice.Questiontime.Value : 0,
                    IsFree = (listeningListeningMultipleChoice.IsFree.HasValue) ? listeningListeningMultipleChoice.IsFree.Value : false,
                    Status = (listeningListeningMultipleChoice.IsActive.HasValue) ? listeningListeningMultipleChoice.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(listeningListeningMultipleChoice);
                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private SelectChoiceQuestions GetFullQuestion(ListeningListeningMultipleChoice listeningListeningMultipleChoice)
        {
            SelectChoiceQuestions selectChoice = new SelectChoiceQuestions();
            selectChoice.timer = listeningListeningMultipleChoice?.Questiontime ?? 0;

            GetCorrectAnswersAndDisplayQuestion(selectChoice.qestion, listeningListeningMultipleChoice.ParagraghText);

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
