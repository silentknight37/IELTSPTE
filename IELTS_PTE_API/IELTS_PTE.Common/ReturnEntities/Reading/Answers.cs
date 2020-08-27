using System;
using System.Collections.Generic;
using System.Text;

namespace IELTS_PTE.Common.ReturnEntities.Reading
{
    public class Answers
    {
        public int id { get; set; }
        public string correctAnswer { get; set; }
        public string selectAnswer { get; set; }
        public List<string> otherAnswer { get; set; }
        public bool isRemove { get; set; }
    }
}
