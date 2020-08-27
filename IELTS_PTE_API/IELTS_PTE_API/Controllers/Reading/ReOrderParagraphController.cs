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

namespace IELTS_PTE_API.Controllers.Reading
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReOrderParagraphController : ControllerBase
    {
        private ReOrderParagraphManager _reOrderParagraphManager = new ReOrderParagraphManager();

        // GET: api/ReOrderParagraph
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _reOrderParagraphManager.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/ReOrderParagraph/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _reOrderParagraphManager.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/ReOrderParagraph
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _reOrderParagraphManager.SaveQuestion(value);
            return response;
        }

        // PUT: api/ReOrderParagraph/5
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
