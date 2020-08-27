using System;
using System.Collections.Generic;
using System.Text;

namespace IELTS_PTE.Common.ReturnEntities.Reading
{
    public class RequestTextForSelectChoice
    {
        public RequestTextForSelectChoice()
        {
            requestAnswer = new List<AnswersForSelectChoice>();
            selectAnswers = new List<AnswersForSelectChoice>();
        }

        public string text { get; set; }
        public int textType { get; set; }
        public List<AnswersForSelectChoice> requestAnswer { get; set; }
        public List<AnswersForSelectChoice> selectAnswers { get; set; }
    }
}
