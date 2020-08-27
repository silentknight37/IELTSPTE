﻿using System;
using System.Collections.Generic;
using System.Text;
using IELTS_PTE.Common.ReturnEntities.Reading;

namespace IELTS_PTE.Common.ReturnEntities
{
    public class QuestionForSelect
    {
        public string QuestionName { get; set; }
        public int Id { get; set; }
        public QuestionSetup QuestionDetails { get; set; }
        public SelectChoiceQuestions FullQuestion { get; set; }
    }
}
