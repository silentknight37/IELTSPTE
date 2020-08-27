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
    public class WritingEssayController : ControllerBase
    {
        private Writing_EssayManager _Writing_EssayManager = new Writing_EssayManager();

        // GET: api/WritingEssay
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _Writing_EssayManager.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/WritingEssay/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _Writing_EssayManager.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/WritingEssay
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _Writing_EssayManager.SaveQuestion(value);
            return response;
        }

        [HttpPost]
        [Route("SendReview")]
        public JsonReturn SendReview([FromBody] ReviewEmail value)
        {
            var response = new JsonReturn();
            response = _Writing_EssayManager.SendReview(value);
            return response;
        }
    }
}
