using System;
using System.Collections.Generic;
using System.Text;

namespace IELTS_PTE.Common.ReturnEntities.Reading
{
    public class RequestText
    {
        public string text { get; set; }
        public int textType { get; set; }
        public Answers requestAnswer { get; set; }
    }
}
