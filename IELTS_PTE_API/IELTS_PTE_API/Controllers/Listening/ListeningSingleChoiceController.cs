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
    public class ListeningSingleChoiceController : ControllerBase
    {
        private ListeningSingleChoiceManager _listeningSingleChoice = new ListeningSingleChoiceManager();

        // GET: api/ReadingMultipleChoice
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            QuestionsForSelect questions = _listeningSingleChoice.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/ReadingMultipleChoice/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup question = _listeningSingleChoice.GetQuestionsById(id);
            response.Records = question;
            return response;
        }

        // POST: api/ReadingMultipleChoice
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _listeningSingleChoice.SaveQuestion(value);
            return response;
        }
    }
}
