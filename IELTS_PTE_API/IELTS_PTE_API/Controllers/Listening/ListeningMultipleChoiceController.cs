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
    public class ListeningMultipleChoiceController : ControllerBase
    {
        private ListeningMultipleChoiceManager _listeningMultipleChoice = new ListeningMultipleChoiceManager();

        // GET: api/ReadingMultipleChoice
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            QuestionsForSelect questions = _listeningMultipleChoice.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/ReadingMultipleChoice/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup question = _listeningMultipleChoice.GetQuestionsById(id);
            response.Records = question;
            return response;
        }

        // POST: api/ReadingMultipleChoice
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _listeningMultipleChoice.SaveQuestion(value);
            return response;
        }
    }
}
