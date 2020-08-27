using IELTS_PTE.Common;
using IELTS_PTE.Common.ReturnEntities.Reading;
using IELTS_PTE.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using IELTS_PTE.Common.ReturnEntities;

namespace IELTS_PTE.Business
{
    public class ReOrderParagraphManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();
        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ReadingReOrderParagraph readingReOrderParagraph;
            if (value.Id > 0)
            {
                readingReOrderParagraph = dbContext.ReadingReOrderParagraph.FirstOrDefault(i => i.Id == value.Id);

                if (readingReOrderParagraph == null)
                {
                    readingReOrderParagraph = new ReadingReOrderParagraph();
                }
            }
            else
            {
                readingReOrderParagraph = new ReadingReOrderParagraph();
            }

            readingReOrderParagraph.IsFree = value.IsFree;
            readingReOrderParagraph.ParagraghText = value.Question;
            readingReOrderParagraph.Questiontime = value.Timer;
            readingReOrderParagraph.Subject = value.Subject;
            readingReOrderParagraph.IsActive = value.Status;
            readingReOrderParagraph.UpdatedBy = "Admin";
            readingReOrderParagraph.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(readingReOrderParagraph).State = EntityState.Modified;
            }
            else
            {
                readingReOrderParagraph.CreatedBy = "Admin";
                readingReOrderParagraph.CreatedDate = DateTime.Now;
                dbContext.ReadingReOrderParagraph.Add(readingReOrderParagraph);
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

            var readingReOrderParagraphList = dbContext.ReadingReOrderParagraph.Where(i => i.IsActive == true).ToList();

            foreach (var readingReOrderParagraph in readingReOrderParagraphList)
            {
                Question question = new Question();
                question.Id = readingReOrderParagraph.Id;
                question.QuestionName = readingReOrderParagraph.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = readingReOrderParagraph.Id,
                    ModalId = $"fillInTheBlankEdit_{readingReOrderParagraph.Id}",
                    TargetId = $"#fillInTheBlankEdit_{readingReOrderParagraph.Id}",
                    Subject = readingReOrderParagraph.Subject,
                    Question = GetText(readingReOrderParagraph.ParagraghText),
                    Timer = (readingReOrderParagraph.Questiontime.HasValue) ? readingReOrderParagraph.Questiontime.Value : 0,
                    IsFree = (readingReOrderParagraph.IsFree.HasValue) ? readingReOrderParagraph.IsFree.Value : false,
                    Status = (readingReOrderParagraph.IsActive.HasValue) ? readingReOrderParagraph.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(readingReOrderParagraph);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private string GetText(string text)
        {
            string answer = Regex.Replace(text, @"\t|\n|\r","");
            return answer.Replace("][", "],[");
        }

        private FillInBlanks GetFullQuestion(ReadingReOrderParagraph readingReOrderParagraph)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = readingReOrderParagraph?.Questiontime ?? 0;

            GetCorrectAnswersAndDisplayQuestion(fillInBlanks.qestion, readingReOrderParagraph.ParagraghText);

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
                            sb = new StringBuilder();
                            continue;
                        }

                    case ']':
                        {
                            RequestText displayText = new RequestText
                            {
                                text = sb.ToString(),
                                textType = 1,
                                requestAnswer = new Answers
                                {
                                    id = index
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

            Shuffle(question);
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
            var readingReOrderParagraph = dbContext.ReadingReOrderParagraph.FirstOrDefault(i => i.Id == id);

            if (readingReOrderParagraph == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = readingReOrderParagraph.Id,
                Subject = readingReOrderParagraph.Subject,
                IsFree = (readingReOrderParagraph.IsFree.HasValue) ? readingReOrderParagraph.IsFree.Value : false,
                Question = readingReOrderParagraph.ParagraghText,
                Status = (readingReOrderParagraph.IsActive.HasValue) ? readingReOrderParagraph.IsActive.Value : false,
                Timer = (readingReOrderParagraph.Questiontime.HasValue) ? readingReOrderParagraph.Questiontime.Value : 0
            };

            return question;
        }
    }
}
