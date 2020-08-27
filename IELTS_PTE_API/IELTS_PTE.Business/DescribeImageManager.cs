using IELTS_PTE.Common;
using IELTS_PTE.Common.ReturnEntities.Reading;
using IELTS_PTE.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using IELTS_PTE.Common.ReturnEntities;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace IELTS_PTE.Business
{
    public class DescribeImageManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();

        public QuestionSetup MapQuestionSetup( HttpRequest value)
        {
            return MapEntity(value.Form);
        }

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            SpeakingDescribeImage speakingDescribeImage;
            if (value.Id > 0)
            {
                speakingDescribeImage = dbContext.SpeakingDescribeImage.FirstOrDefault(i => i.Id == value.Id);

                if (speakingDescribeImage == null)
                {
                    speakingDescribeImage = new SpeakingDescribeImage();
                }
            }
            else
            {
                speakingDescribeImage = new SpeakingDescribeImage();
            }

            speakingDescribeImage.IsFree = value.IsFree;
            speakingDescribeImage.ParagraghText = value.Question;
            speakingDescribeImage.Questiontime = value.Timer;
            speakingDescribeImage.Subject = value.Subject;
            speakingDescribeImage.IsActive = value.Status;
            speakingDescribeImage.UpdatedBy = "Admin";
            speakingDescribeImage.UpdatedDate = DateTime.Now;
            speakingDescribeImage.ImagePath = value.ImagePath;

            if (value.Id > 0)
            {
                dbContext.Entry(speakingDescribeImage).State = EntityState.Modified;
            }
            else
            {
                speakingDescribeImage.CreatedBy = "Admin";
                speakingDescribeImage.CreatedDate = DateTime.Now;
                dbContext.SpeakingDescribeImage.Add(speakingDescribeImage);
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

            var speakingDescribeImageList = dbContext.SpeakingDescribeImage.Where(i => i.IsActive == true).ToList();

            foreach (var speakingDescribeImage in speakingDescribeImageList)
            {
                Question question = new Question();
                question.Id = speakingDescribeImage.Id;
                question.QuestionName = speakingDescribeImage.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = speakingDescribeImage.Id,
                    ModalId = $"fillInTheBlankEdit_{speakingDescribeImage.Id}",
                    TargetId = $"#fillInTheBlankEdit_{speakingDescribeImage.Id}",
                    Subject = speakingDescribeImage.Subject,
                    Question = speakingDescribeImage.ParagraghText,
                    Timer = (speakingDescribeImage.Questiontime.HasValue) ? speakingDescribeImage.Questiontime.Value : 0,
                    IsFree = (speakingDescribeImage.IsFree.HasValue) ? speakingDescribeImage.IsFree.Value : false,
                    Status = (speakingDescribeImage.IsActive.HasValue) ? speakingDescribeImage.IsActive.Value : false,
                    ImagePath=speakingDescribeImage.ImagePath
                };
                question.FullQuestion = GetFullQuestion(speakingDescribeImage);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private FillInBlanks GetFullQuestion(SpeakingDescribeImage speakingDescribeImage)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = speakingDescribeImage?.Questiontime ?? 0;

            //GetCorrectAnswersAndDisplayQuestion(fillInBlanks.qestion, readingReOrderParagraph.ParagraghText);

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

            //Shuffle(question);
        }

        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var speakingDescribeImage = dbContext.SpeakingDescribeImage.FirstOrDefault(i => i.Id == id);

            if (speakingDescribeImage == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = speakingDescribeImage.Id,
                Subject = speakingDescribeImage.Subject,
                IsFree = (speakingDescribeImage.IsFree.HasValue) ? speakingDescribeImage.IsFree.Value : false,
                Question = speakingDescribeImage.ParagraghText,
                Status = (speakingDescribeImage.IsActive.HasValue) ? speakingDescribeImage.IsActive.Value : false,
                Timer = (speakingDescribeImage.Questiontime.HasValue) ? speakingDescribeImage.Questiontime.Value : 0,
                ImagePath=speakingDescribeImage.ImagePath
            };

            return question;
        }

        private QuestionSetup MapEntity(IFormCollection entity)
        {
            var f = entity["entityData"];
            return Newtonsoft.Json.JsonConvert.DeserializeObject<QuestionSetup>(f);
        }

        
    }
}
