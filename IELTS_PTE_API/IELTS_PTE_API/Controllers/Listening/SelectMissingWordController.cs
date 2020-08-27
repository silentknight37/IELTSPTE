﻿using System;
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
    public class SelectMissingWordController : ControllerBase
    {
        private SelectMissingWordManager _selectMissingWord = new SelectMissingWordManager();

        // GET: api/SelectMissingWord
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _selectMissingWord.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/SelectMissingWord/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _selectMissingWord.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/SelectMissingWord
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _selectMissingWord.SaveQuestion(value);
            return response;
        }
    }
}
