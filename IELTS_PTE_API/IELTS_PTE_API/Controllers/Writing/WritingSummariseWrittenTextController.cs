using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IELTS_PTE.Business;
using IELTS_PTE.Common;
using IELTS_PTE.Common.ReturnEntities;
using IELTS_PTE.Common.ReturnEntities.Reading;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IELTS_PTE_API.Controllers.Listening
{
    [Route("api/[controller]")]
    [ApiController]
    public class WritingSummariseWrittenTextController : ControllerBase
    {
        private Writing_SummariseWrittenText _Writing_SummariseWrittenText = new Writing_SummariseWrittenText();

        // GET: api/WritingSummariseWrittenText
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _Writing_SummariseWrittenText.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/WritingSummariseWrittenText/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _Writing_SummariseWrittenText.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/WritingSummariseWrittenText
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _Writing_SummariseWrittenText.SaveQuestion(value);
            return response;
        }

        [HttpPost]
        [Route("SendReview")]
        public JsonReturn SendReview([FromBody] ReviewEmail value)
        {
            var response = new JsonReturn();
            response = _Writing_SummariseWrittenText.SendReview(value);
            return response;
        }
    }
}
