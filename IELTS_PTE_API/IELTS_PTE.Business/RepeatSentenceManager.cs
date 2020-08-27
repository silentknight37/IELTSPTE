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
    public class RepeatSentenceManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            SpeakingRepeatSentence speakingRepeatSentence;
            if (value.Id > 0)
            {
                speakingRepeatSentence = dbContext.SpeakingRepeatSentence.FirstOrDefault(i => i.Id == value.Id);

                if (speakingRepeatSentence == null)
                {
                    speakingRepeatSentence = new SpeakingRepeatSentence();
                }
            }
            else
            {
                speakingRepeatSentence = new SpeakingRepeatSentence();
            }

            speakingRepeatSentence.IsFree = value.IsFree;
            speakingRepeatSentence.ParagraghText = value.Question;
            speakingRepeatSentence.Questiontime = value.Timer;
            speakingRepeatSentence.Subject = value.Subject;
            speakingRepeatSentence.IsActive = value.Status;
            speakingRepeatSentence.UpdatedBy = "Admin";
            speakingRepeatSentence.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(speakingRepeatSentence).State = EntityState.Modified;
            }
            else
            {
                speakingRepeatSentence.CreatedBy = "Admin";
                speakingRepeatSentence.CreatedDate = DateTime.Now;
                dbContext.SpeakingRepeatSentence.Add(speakingRepeatSentence);
            }

            dbContext.SaveChanges();
            return new JsonReturn
            {
                Records = value,
                IsSuccess = true,
                Message = "Data Save Successfully"
            };
        }

        public JsonReturn SaveAnswer(string blobURL)
        {
            SpeakingRepeatSentenceReview speakingRepeatSentenceReview=new SpeakingRepeatSentenceReview();

            speakingRepeatSentenceReview.Answer = blobURL;
            speakingRepeatSentenceReview.IsExpire = false;
            speakingRepeatSentenceReview.IsReviewed = false;
            speakingRepeatSentenceReview.QuestionId = 1;
            speakingRepeatSentenceReview.CreatedBy = "text";
            speakingRepeatSentenceReview.CreatedDate = DateTime.Now;
            speakingRepeatSentenceReview.UpdatedBy = "text";
            speakingRepeatSentenceReview.UpdatedDate = DateTime.Now;
            dbContext.SpeakingRepeatSentenceReview.Add(speakingRepeatSentenceReview);
            dbContext.SaveChanges();
            return new JsonReturn
            {
                Records = "",
                IsSuccess = true,
                Message = "Data Save Successfully"
            };
        }

        public Questions GetQuestions()
        {
            Questions questions = new Questions();
            List<Question> questionList = new List<Question>();

            var speakingRepeatSentenceList = dbContext.SpeakingRepeatSentence.Where(i => i.IsActive == true).ToList();

            foreach (var speakingRepeatSentence in speakingRepeatSentenceList)
            {
                Question question = new Question();
                question.Id = speakingRepeatSentence.Id;
                question.QuestionName = speakingRepeatSentence.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = speakingRepeatSentence.Id,
                    ModalId = $"fillInTheBlankEdit_{speakingRepeatSentence.Id}",
                    TargetId = $"#fillInTheBlankEdit_{speakingRepeatSentence.Id}",
                    Subject = speakingRepeatSentence.Subject,
                    Question = speakingRepeatSentence.ParagraghText,
                    Timer = (speakingRepeatSentence.Questiontime.HasValue) ? speakingRepeatSentence.Questiontime.Value : 0,
                    IsFree = (speakingRepeatSentence.IsFree.HasValue) ? speakingRepeatSentence.IsFree.Value : false,
                    Status = (speakingRepeatSentence.IsActive.HasValue) ? speakingRepeatSentence.IsActive.Value : false
                };
                question.FullQuestion = GetFullQuestion(speakingRepeatSentence);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        private FillInBlanks GetFullQuestion(SpeakingRepeatSentence speakingRepeatSentence)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = speakingRepeatSentence?.Questiontime ?? 0;

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
            var speakingRepeatSentence = dbContext.SpeakingRepeatSentence.FirstOrDefault(i => i.Id == id);

            if (speakingRepeatSentence == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = speakingRepeatSentence.Id,
                Subject = speakingRepeatSentence.Subject,
                IsFree = (speakingRepeatSentence.IsFree.HasValue) ? speakingRepeatSentence.IsFree.Value : false,
                Question = speakingRepeatSentence.ParagraghText,
                Status = (speakingRepeatSentence.IsActive.HasValue) ? speakingRepeatSentence.IsActive.Value : false,
                Timer = (speakingRepeatSentence.Questiontime.HasValue) ? speakingRepeatSentence.Questiontime.Value : 0
            };

            return question;
        }


    }
}
