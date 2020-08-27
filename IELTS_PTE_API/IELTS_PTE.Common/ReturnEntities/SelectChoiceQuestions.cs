using System;
using System.Collections.Generic;
using System.Text;
using IELTS_PTE.Common.ReturnEntities.Reading;

namespace IELTS_PTE.Common.ReturnEntities
{
    public class SelectChoiceQuestions
    {
        public SelectChoiceQuestions()
        {
            qestion=new List<RequestTextForSelectChoice>();
            answers=new List<string>();
        }

        public List<RequestTextForSelectChoice> qestion { get; set; }
        public List<string> answers { get; set; }
        public int timer { get; set; }
    }
}
