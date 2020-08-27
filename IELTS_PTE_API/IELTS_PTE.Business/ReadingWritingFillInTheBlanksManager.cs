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
    public class ReadingWritingFillInTheBlanksManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ReadingReadingWritingFillInTheBlank readingReadingWritingFillInTheBlank;
            if (value.Id > 0)
            {
                readingReadingWritingFillInTheBlank = dbContext.ReadingReadingWritingFillInTheBlank.FirstOrDefault(i => i.Id == value.Id);

                if(readingReadingWritingFillInTheBlank == null)
                {
                    readingReadingWritingFillInTheBlank = new ReadingReadingWritingFillInTheBlank();
                }
            }
            else
            {
                readingReadingWritingFillInTheBlank = new ReadingReadingWritingFillInTheBlank();
            }

            readingReadingWritingFillInTheBlank.IsFree = value.IsFree;
            readingReadingWritingFillInTheBlank.ParagraghText = value.Question;
            readingReadingWritingFillInTheBlank.Questiontime = value.Timer;
            readingReadingWritingFillInTheBlank.Subject = value.Subject;
            readingReadingWritingFillInTheBlank.IsActive = value.Status;
            readingReadingWritingFillInTheBlank.UpdatedBy = "Admin";
            readingReadingWritingFillInTheBlank.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(readingReadingWritingFillInTheBlank).State = EntityState.Modified;
            }
            else
            {
                readingReadingWritingFillInTheBlank.CreatedBy = "Admin";
                readingReadingWritingFillInTheBlank.CreatedDate = DateTime.Now;
                dbContext.ReadingReadingWritingFillInTheBlank.Add(readingReadingWritingFillInTheBlank);
            }

            dbContext.SaveChanges();
            return new JsonReturn
            {
                IsSuccess = true,
                Message = "Data Save Successfully"
            };
        }

        public Questions GetQuestions()
        {
            Questions questions = new Questions();
            List<Question> questionList = new List<Question>();

            var readingReadingWritingFillInTheBlankList = dbContext.ReadingReadingWritingFillInTheBlank.Where(i => i.IsActive == true).ToList();

            foreach (var readingReadingWritingFillInTheBlank in readingReadingWritingFillInTheBlankList)
            {
                Question question = new Question();
                question.Id = readingReadingWritingFillInTheBlank.Id;
                question.QuestionName = readingReadingWritingFillInTheBlank.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = readingReadingWritingFillInTheBlank.Id,
                    ModalId = $"fillInTheBlankEdit_{readingReadingWritingFillInTheBlank.Id}",
                    TargetId = $"#fillInTheBlankEdit_{readingReadingWritingFillInTheBlank.Id}",
                    Subject = readingReadingWritingFillInTheBlank.Subject,
                    Question = readingReadingWritingFillInTheBlank.ParagraghText,
                    Timer = (readingReadingWritingFillInTheBlank.Questiontime.HasValue) ? readingReadingWritingFillInTheBlank.Questiontime.Value : 0,
                    IsFree = (readingReadingWritingFillInTheBlank.IsFree.HasValue) ? readingReadingWritingFillInTheBlank.IsFree.Value : false,
                    Status = (readingReadingWritingFillInTheBlank.IsActive.HasValue) ? readingReadingWritingFillInTheBlank.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(readingReadingWritingFillInTheBlank);
                question.QuestionDetails.Question = GetText(question.FullQuestion);
                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private string GetText(FillInBlanks fulInBlanks)
        {
            string questionText = string.Empty;

            foreach (var question in fulInBlanks.qestion)
            {
                if (question.text == "q")
                {
                    questionText = $"{questionText} {question.requestAnswer.correctAnswer}";
                }
                else
                {
                    questionText = $"{questionText} {question.text}";
                }
            }
            

            return questionText.TrimStart().TrimEnd();
        }

        private FillInBlanks GetFullQuestion(ReadingReadingWritingFillInTheBlank readingReadingWritingFillInTheBlank)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = readingReadingWritingFillInTheBlank?.Questiontime ?? 0;

            GetCorrectAnswersAndDisplayQuestion(fillInBlanks.qestion, readingReadingWritingFillInTheBlank.ParagraghText);

            return fillInBlanks;
        }

        private void GetCorrectAnswersAndDisplayQuestion(List<RequestText> question, string paraText)
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
                        string answer = sb.ToString();
                        var answerList = answer.Split(',');
                        string correctAnswer = answerList[0];
                        Shuffle(answerList);
                        RequestText displayText = new RequestText
                        {
                            text = "q",
                            textType = 2,
                            requestAnswer = new Answers
                            {
                                id = index,
                                otherAnswer = answerList.ToList(),
                                correctAnswer = correctAnswer
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
            var readingReadingWritingFillInTheBlankList = dbContext.ReadingReadingWritingFillInTheBlank.FirstOrDefault(i => i.Id == id);

            if (readingReadingWritingFillInTheBlankList == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = readingReadingWritingFillInTheBlankList.Id,
                Subject = readingReadingWritingFillInTheBlankList.Subject,
                IsFree = (readingReadingWritingFillInTheBlankList.IsFree.HasValue) ? readingReadingWritingFillInTheBlankList.IsFree.Value : false,
                Question = readingReadingWritingFillInTheBlankList.ParagraghText,
                Status = (readingReadingWritingFillInTheBlankList.IsActive.HasValue) ? readingReadingWritingFillInTheBlankList.IsActive.Value : false,
                Timer = (readingReadingWritingFillInTheBlankList.Questiontime.HasValue) ? readingReadingWritingFillInTheBlankList.Questiontime.Value : 0
            };

            return question;
        }
    }
}
