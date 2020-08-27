using System;
using System.Collections.Generic;
using System.Text;
using IELTS_PTE.Common.ReturnEntities.Reading;

namespace IELTS_PTE.Common.ReturnEntities
{
    public class FillInBlanks
    {
        public FillInBlanks()
        {
            qestion=new List<RequestText>();
            answers=new List<string>();
        }

        public List<RequestText> qestion { get; set; }
        public List<string> answers { get; set; }
        public int timer { get; set; }
    }
}
