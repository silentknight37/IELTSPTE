using System;
using System.Collections.Generic;
using System.Text;
using IELTS_PTE.Common.ReturnEntities.Reading;

namespace IELTS_PTE.Common.ReturnEntities
{
    public class Question
    {
        public string QuestionName { get; set; }
        public int Id { get; set; }
        public QuestionSetup QuestionDetails { get; set; }
        public FillInBlanks FullQuestion { get; set; }
    }
}
