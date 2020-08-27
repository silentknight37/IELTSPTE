using System;
using IELTS_PTE.Business;
using IELTS_PTE.Common;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using IELTS_PTE.Common.ReturnEntities;
using IELTS_PTE.Common.ReturnEntities.Reading;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;

namespace IELTS_PTE_API.Controllers.Speaking
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReTellLectureController : ControllerBase
    {
        private ReTellLectureManager _reTellLectureManager = new ReTellLectureManager();

        // GET: api/ReTellLecture
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _reTellLectureManager.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/ReTellLecture/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _reTellLectureManager.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/ReTellLecture
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _reTellLectureManager.SaveQuestion(value);
            return response;
        }
    }
}
