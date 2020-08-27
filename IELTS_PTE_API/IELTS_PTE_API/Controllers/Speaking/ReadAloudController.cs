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

namespace IELTS_PTE_API.Controllers.Speaking
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReadAloudController : ControllerBase
    {
        private ReadAloudManager _readAloudManager = new ReadAloudManager();

        // GET: api/ReadAloud
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _readAloudManager.GetQuestions();
            response.Records = questions;
            return response;
        }

        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _readAloudManager.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/ReadAloud
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _readAloudManager.SaveQuestion(value);
            return response;
        }

       
    }
}
