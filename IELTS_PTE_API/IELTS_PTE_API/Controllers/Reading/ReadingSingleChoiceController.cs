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
    public class ReadingSingleChoiceController : ControllerBase
    {
        private ReadingSingleChoiceManager _readingSingleChoice = new ReadingSingleChoiceManager();

        // GET: api/ReadingMultipleChoice
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            QuestionsForSelect questions = _readingSingleChoice.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/ReadingMultipleChoice/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup question = _readingSingleChoice.GetQuestionsById(id);
            response.Records = question;
            return response;
        }

        // POST: api/ReadingMultipleChoice
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _readingSingleChoice.SaveQuestion(value);
            return response;
        }
    }
}
