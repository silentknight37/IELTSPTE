using System;
using System.Collections.Generic;
using System.Text;

namespace IELTS_PTE.Common
{
    public class JsonReturn
    {
        public object Records { get; set; }
        public string Message { get; set; }
        public object Summary { get; set; }
        public bool IsSuccess { get; set; }
    }
}
