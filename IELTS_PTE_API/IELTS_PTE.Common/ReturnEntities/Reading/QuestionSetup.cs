using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace IELTS_PTE.Common.ReturnEntities.Reading
{
    public class QuestionSetup
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Question { get; set; }
        public string QuestionSummary { get; set; }
        public int Timer { get; set; }
        public bool IsFree { get; set; }
        public bool Status { get; set; }
        public List<string> answerList { get; set; }
        public  string ModalId { get; set; }
        public string TargetId { get; set; }
        public string ImagePath { get; set; }
    }
}
