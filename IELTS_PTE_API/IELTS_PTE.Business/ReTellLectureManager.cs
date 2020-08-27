using IELTS_PTE.Common;
using IELTS_PTE.Common.ReturnEntities.Reading;
using IELTS_PTE.DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using IELTS_PTE.Common.ReturnEntities;

namespace IELTS_PTE.Business
{
    public class ReTellLectureManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            SpeakingReTellLecture speakingReTellLecture;
            if (value.Id > 0)
            {
                speakingReTellLecture = dbContext.SpeakingReTellLecture.FirstOrDefault(i => i.Id == value.Id);

                if (speakingReTellLecture == null)
                {
                    speakingReTellLecture = new SpeakingReTellLecture();
                }
            }
            else
            {
                speakingReTellLecture = new SpeakingReTellLecture();
            }

            speakingReTellLecture.IsFree = value.IsFree;
            speakingReTellLecture.ParagraghText = value.Question;
            speakingReTellLecture.Questiontime = value.Timer;
            speakingReTellLecture.Subject = value.Subject;
            speakingReTellLecture.IsActive = value.Status;
            speakingReTellLecture.UpdatedBy = "Admin";
            speakingReTellLecture.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(speakingReTellLecture).State = EntityState.Modified;
            }
            else
            {
                speakingReTellLecture.CreatedBy = "Admin";
                speakingReTellLecture.CreatedDate = DateTime.Now;
                dbContext.SpeakingReTellLecture.Add(speakingReTellLecture);
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

            var speakingReTellLectureList = dbContext.SpeakingReTellLecture.Where(i => i.IsActive == true).ToList();

            foreach (var speakingReTellLecture in speakingReTellLectureList)
            {
                Question question = new Question();
                question.Id = speakingReTellLecture.Id;
                question.QuestionName = speakingReTellLecture.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = speakingReTellLecture.Id,
                    ModalId = $"fillInTheBlankEdit_{speakingReTellLecture.Id}",
                    TargetId = $"#fillInTheBlankEdit_{speakingReTellLecture.Id}",
                    Subject = speakingReTellLecture.Subject,
                    Question = speakingReTellLecture.ParagraghText,
                    Timer = (speakingReTellLecture.Questiontime.HasValue) ? speakingReTellLecture.Questiontime.Value : 0,
                    IsFree = (speakingReTellLecture.IsFree.HasValue) ? speakingReTellLecture.IsFree.Value : false,
                    Status = (speakingReTellLecture.IsActive.HasValue) ? speakingReTellLecture.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(speakingReTellLecture);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private FillInBlanks GetFullQuestion(SpeakingReTellLecture speakingReTellLecture)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = speakingReTellLecture?.Questiontime ?? 0;

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
            var speakingReTellLecture = dbContext.SpeakingReTellLecture.FirstOrDefault(i => i.Id == id);

            if (speakingReTellLecture == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = speakingReTellLecture.Id,
                Subject = speakingReTellLecture.Subject,
                IsFree = (speakingReTellLecture.IsFree.HasValue) ? speakingReTellLecture.IsFree.Value : false,
                Question = speakingReTellLecture.ParagraghText,
                Status = (speakingReTellLecture.IsActive.HasValue) ? speakingReTellLecture.IsActive.Value : false,
                Timer = (speakingReTellLecture.Questiontime.HasValue) ? speakingReTellLecture.Questiontime.Value : 0
            };

            return question;
        }


    }
}
