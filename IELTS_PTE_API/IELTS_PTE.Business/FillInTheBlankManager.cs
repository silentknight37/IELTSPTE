using System;
using IELTS_PTE.Common.ReturnEntities;
using IELTS_PTE.Common.ReturnEntities.Reading;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using IELTS_PTE.Common;
using IELTS_PTE.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PTE.Business
{
    public class FillInTheBlankManager
    {
        public IELTS_PTEContext dbContext=new IELTS_PTEContext();
        private static Random rng = new Random();

        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var fillingTheBlank = dbContext.ReadingFillingTheBlank.FirstOrDefault(i => i.Id == id);

            if (fillingTheBlank == null)
            {
                return null;
            }

            question=new QuestionSetup
            {
                Id = fillingTheBlank.Id,
                Subject = fillingTheBlank.Subject,
                IsFree = (fillingTheBlank.IsFree.HasValue)?fillingTheBlank.IsFree.Value:false,
                Question = fillingTheBlank.ParagraghText,
                Status = (fillingTheBlank.IsActive.HasValue)?fillingTheBlank.IsActive.Value:false,
                Timer = (fillingTheBlank.Questiontime.HasValue)?fillingTheBlank.Questiontime.Value:0,
                answerList = fillingTheBlank.OptionAnswers.Split(',').ToList()
            };

            return question;
        }
        private string GetText(string text)
        {
            string questionText = text.Replace("[", string.Empty);
            questionText = questionText.Replace("]", string.Empty);

            return questionText;
        }

        public Questions GetQuestions()
        {
            Questions questions = new Questions();
            List<Question> questionList=new List<Question>();

            var fillingTheBlankList = dbContext.ReadingFillingTheBlank.Where(i => i.IsActive==true).ToList();

            foreach (var fillingTheBlank in fillingTheBlankList)
            {
                Question question=new Question();
                question.Id = fillingTheBlank.Id;
                question.QuestionName = fillingTheBlank.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = fillingTheBlank.Id,
                    ModalId= $"fillInTheBlankEdit_{fillingTheBlank.Id}",
                    TargetId = $"#fillInTheBlankEdit_{fillingTheBlank.Id}",
                    Subject = fillingTheBlank.Subject,
                    Question = GetText(fillingTheBlank.ParagraghText),
                    Timer = (fillingTheBlank.Questiontime.HasValue) ? fillingTheBlank.Questiontime.Value : 0,
                    IsFree = (fillingTheBlank.IsFree.HasValue) ? fillingTheBlank.IsFree.Value : false,
                    answerList = fillingTheBlank.OptionAnswers.Split(',').ToList(),
                    Status = (fillingTheBlank.IsActive.HasValue)? fillingTheBlank.IsActive.Value : false
                };

                question.FullQuestion=GetFullQuestion(fillingTheBlank);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;
            
            return questions;
        }

        private FillInBlanks GetFullQuestion(ReadingFillingTheBlank fillingTheBlank)
        {
            FillInBlanks fillInBlanks=new FillInBlanks();
            fillInBlanks.timer = fillingTheBlank?.Questiontime??0;
            if (fillingTheBlank.OptionAnswers != null)
            {
                var answerlist = fillingTheBlank.OptionAnswers.Split(',');
                fillInBlanks.answers.AddRange(answerlist);
            }

            GetCorrectAnswersAndDisplayQuestion(fillInBlanks.answers, fillInBlanks.qestion, fillingTheBlank.ParagraghText);
            
            return fillInBlanks;
        }

        private void GetCorrectAnswersAndDisplayQuestion(List<string> answerList,List<RequestText> question, string paraText)
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

                        answerList.Add(sb.ToString());
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

            Shuffle(answerList);
        }
        
        private void Shuffle<T>(IList<T> list)
        {
            int n = list.Count;
            while (n>1)
            {
                n--;
                int k = rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ReadingFillingTheBlank readingFillingTheBlank;
            if (value.Id > 0)
            {
                readingFillingTheBlank = dbContext.ReadingFillingTheBlank.FirstOrDefault(i => i.Id == value.Id);

                if (readingFillingTheBlank == null)
                {
                    readingFillingTheBlank = new ReadingFillingTheBlank();
                }
            }
            else
            {
                readingFillingTheBlank = new ReadingFillingTheBlank();
            }
                
            readingFillingTheBlank.IsFree = value.IsFree;
            readingFillingTheBlank.ParagraghText = value.Question;
            readingFillingTheBlank.OptionAnswers = string.Join(',', value.answerList);
            readingFillingTheBlank.Questiontime = value.Timer;
            readingFillingTheBlank.Subject = value.Subject;
            readingFillingTheBlank.IsActive = value.Status;
            readingFillingTheBlank.UpdatedBy = "Admin";
            readingFillingTheBlank.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(readingFillingTheBlank).State = EntityState.Modified;
            }
            else
            {
                readingFillingTheBlank.CreatedBy = "Admin";
                readingFillingTheBlank.CreatedDate = DateTime.Now;
                dbContext.ReadingFillingTheBlank.Add(readingFillingTheBlank);
            }
            
            dbContext.SaveChanges();
            return new JsonReturn
            {
                IsSuccess = true,
                Message = "Data Save Successfully"
            };
        }
    }
}
