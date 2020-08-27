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
    public class WriteFromDictationController : ControllerBase
    {
        private WriteFromDictationManager _writeFromDictationManager = new WriteFromDictationManager();

        // GET: api/WriteFromDictation
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _writeFromDictationManager.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/WriteFromDictation/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _writeFromDictationManager.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/WriteFromDictation
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _writeFromDictationManager.SaveQuestion(value);
            return response;
        }
    }
}
