using System;
using System.Collections.Generic;
using System.Text;

namespace IELTS_PTE.Common.ReturnEntities
{
    public class Questions
    {
        public List<Question> QuestionList { get; set; }
    }

    public class QuestionsForSelect
    {
        public List<QuestionForSelect> QuestionList { get; set; }
    }
}
