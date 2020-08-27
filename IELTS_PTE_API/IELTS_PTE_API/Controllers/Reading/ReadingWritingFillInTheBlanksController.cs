using IELTS_PTE.Business;
using IELTS_PTE.Common;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using IELTS_PTE.Common.ReturnEntities;
using IELTS_PTE.Common.ReturnEntities.Reading;

namespace IELTS_PTE_API.Controllers.Reading
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReadingWritingFillInTheBlanksController : ControllerBase
    {
        private ReadingWritingFillInTheBlanksManager _readingWritingFillInTheBlanks = new ReadingWritingFillInTheBlanksManager();

        // GET: api/ReadingWritingFillInTheBlanks
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _readingWritingFillInTheBlanks.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/ReadingWritingFillInTheBlanks/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup question = _readingWritingFillInTheBlanks.GetQuestionsById(id);
            response.Records = question;
            return response;
        }

        // POST: api/ReadingWritingFillInTheBlanks
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _readingWritingFillInTheBlanks.SaveQuestion(value);
            return response;
        }

        // PUT: api/ReadingWritingFillInTheBlanks/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
