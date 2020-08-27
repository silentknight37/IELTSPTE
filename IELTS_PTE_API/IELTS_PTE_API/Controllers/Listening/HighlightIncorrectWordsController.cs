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
    public class HighlightIncorrectWordsController : ControllerBase
    {
        private HighlightIncorrectWordsManager _highlightIncorrectWordsManager = new HighlightIncorrectWordsManager();

        // GET: api/FillInBlanks
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _highlightIncorrectWordsManager.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/FillInBlanks/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _highlightIncorrectWordsManager.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/FillInBlanks
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _highlightIncorrectWordsManager.SaveQuestion(value);
            return response;
        }
    }
}
