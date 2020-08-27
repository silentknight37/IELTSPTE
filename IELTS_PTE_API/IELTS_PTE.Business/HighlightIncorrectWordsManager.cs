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
    public class HighlightIncorrectWordsManager
    {
        public IELTS_PTEContext dbContext = new IELTS_PTEContext();
        private static Random rng = new Random();

        public JsonReturn SaveQuestion(QuestionSetup value)
        {

            ListeningHighlightIncorrectWords listeningHighlightIncorrectWords;
            if (value.Id > 0)
            {
                listeningHighlightIncorrectWords = dbContext.ListeningHighlightIncorrectWords.FirstOrDefault(i => i.Id == value.Id);

                if (listeningHighlightIncorrectWords == null)
                {
                    listeningHighlightIncorrectWords = new ListeningHighlightIncorrectWords();
                }
            }
            else
            {
                listeningHighlightIncorrectWords = new ListeningHighlightIncorrectWords();
            }

            listeningHighlightIncorrectWords.IsFree = value.IsFree;
            listeningHighlightIncorrectWords.ParagraghText = value.Question;
            listeningHighlightIncorrectWords.Questiontime = value.Timer;
            listeningHighlightIncorrectWords.Subject = value.Subject;
            listeningHighlightIncorrectWords.IsActive = value.Status;
            listeningHighlightIncorrectWords.UpdatedBy = "Admin";
            listeningHighlightIncorrectWords.UpdatedDate = DateTime.Now;

            if (value.Id > 0)
            {
                dbContext.Entry(listeningHighlightIncorrectWords).State = EntityState.Modified;
            }
            else
            {
                listeningHighlightIncorrectWords.CreatedBy = "Admin";
                listeningHighlightIncorrectWords.CreatedDate = DateTime.Now;
                dbContext.ListeningHighlightIncorrectWords.Add(listeningHighlightIncorrectWords);
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

            var listeningHighlightIncorrectWords = dbContext.ListeningHighlightIncorrectWords.Where(i => i.IsActive == true).ToList();

            foreach (var listeningHighlightIncorrectWord in listeningHighlightIncorrectWords)
            {
                Question question = new Question();
                question.Id = listeningHighlightIncorrectWord.Id;
                question.QuestionName = listeningHighlightIncorrectWord.Subject;
                question.QuestionDetails = new QuestionSetup
                {
                    Id = listeningHighlightIncorrectWord.Id,
                    ModalId = $"fillInTheBlankEdit_{listeningHighlightIncorrectWord.Id}",
                    TargetId = $"#fillInTheBlankEdit_{listeningHighlightIncorrectWord.Id}",
                    Subject = listeningHighlightIncorrectWord.Subject,
                    Timer = (listeningHighlightIncorrectWord.Questiontime.HasValue) ? listeningHighlightIncorrectWord.Questiontime.Value : 0,
                    IsFree = (listeningHighlightIncorrectWord.IsFree.HasValue) ? listeningHighlightIncorrectWord.IsFree.Value : false,
                    Status = (listeningHighlightIncorrectWord.IsActive.HasValue) ? listeningHighlightIncorrectWord.IsActive.Value : false
                };

                question.FullQuestion = GetFullQuestion(listeningHighlightIncorrectWord, question.QuestionDetails);

                questionList.Add(question);
            }

            questions.QuestionList = questionList;

            return questions;
        }

        
        private FillInBlanks GetFullQuestion(ListeningHighlightIncorrectWords listeningHighlightIncorrectWords, QuestionSetup questionDetails)
        {
            FillInBlanks fillInBlanks = new FillInBlanks();
            fillInBlanks.timer = listeningHighlightIncorrectWords?.Questiontime ?? 0;
            
            GetCorrectAnswersAndDisplayQuestion( fillInBlanks.qestion, listeningHighlightIncorrectWords.ParagraghText, questionDetails);

            return fillInBlanks;
        }

        private void GetCorrectAnswersAndDisplayQuestion( List<RequestText> question, string paraText, QuestionSetup questionDetails)
        {
            string[] text = paraText.Split(' ');
            List<string> questionText=new List<string>();
            int i = 1;
            foreach (var t in text)
            {
                if (t.StartsWith('['))
                {
                    string word = t.Replace("[", "");
                    word = word.Replace("]", "");

                    string[] answers = word.Split(',');
                    if (answers.Length > 0)
                    {
                        questionText.Add(answers[0]);

                        RequestText displayText = new RequestText
                        {
                            text = answers[1],
                            textType = 1,
                            requestAnswer = new Answers
                            {
                                id = i,
                                isRemove = false,
                                selectAnswer = "",
                                correctAnswer = answers[1]
                            }
                        };

                        question.Add(displayText);
                    }
                }
                else
                {
                    questionText.Add(t);
                    RequestText displayText = new RequestText
                    {
                        text = t,
                        textType = 1,
                        requestAnswer = new Answers
                        {
                            id = i,
                            isRemove = false,
                            selectAnswer = "",
                            correctAnswer = ""
                        }
                    };

                    question.Add(displayText);
                }

                i++;
            }

            if (questionText.Any())
            {
                questionDetails.Question= String.Join(" ", questionText);
            }
        }
        

        public QuestionSetup GetQuestionsById(int id)
        {
            QuestionSetup question;
            var listeningHighlightIncorrectWords = dbContext.ListeningHighlightIncorrectWords.FirstOrDefault(i => i.Id == id);

            if (listeningHighlightIncorrectWords == null)
            {
                return null;
            }

            question = new QuestionSetup
            {
                Id = listeningHighlightIncorrectWords.Id,
                Subject = listeningHighlightIncorrectWords.Subject,
                IsFree = (listeningHighlightIncorrectWords.IsFree.HasValue) ? listeningHighlightIncorrectWords.IsFree.Value : false,
                Question = listeningHighlightIncorrectWords.ParagraghText,
                Status = (listeningHighlightIncorrectWords.IsActive.HasValue) ? listeningHighlightIncorrectWords.IsActive.Value : false,
                Timer = (listeningHighlightIncorrectWords.Questiontime.HasValue) ? listeningHighlightIncorrectWords.Questiontime.Value : 0
            };

            return question;
        }

    }
}
