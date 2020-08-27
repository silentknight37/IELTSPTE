using System;
using IELTS_PTE.Business;
using IELTS_PTE.Common;
using IELTS_PTE.Common.ReturnEntities;
using IELTS_PTE.Common.ReturnEntities.Reading;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;

namespace IELTS_PTE_API.Controllers.Reading
{
    [Route("api/[controller]")]
    [ApiController]
    public class FillingTheBlanksController : ControllerBase
    {
        private FillInTheBlankManager _fillInTheBlankManager = new FillInTheBlankManager();
        // GET: api/FillingTheBlanks
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            try
            {
                Questions questions = _fillInTheBlankManager.GetQuestions();
                response.Records = questions;
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            return response;
        }

        // GET: api/FillingTheBlanks/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup question = _fillInTheBlankManager.GetQuestionsById(id);
            response.Records = question;
            return response;
        }

        // POST: api/FillingTheBlanks
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response= _fillInTheBlankManager.SaveQuestion(value);
            return response;
        }
        
        // PUT: api/FillingTheBlanks/5
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
