using System;
using IELTS_PTE.Business;
using IELTS_PTE.Common;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using IELTS_PTE.Common.ReturnEntities;
using IELTS_PTE.Common.ReturnEntities.Reading;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.AspNetCore.Hosting;

namespace IELTS_PTE_API.Controllers.Speaking
{
    [Route("api/[controller]")]
    [ApiController]
    public class DescribeImageController : ControllerBase
    {
        //IHostingEnvironment env;

        //public DescribeImageController(IHostingEnvironment environment)
        //{
        //    env = environment;
        //}

        private DescribeImageManager _describeImageManager = new DescribeImageManager();

        // GET: api/DescribeImage
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _describeImageManager.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/DescribeImage/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _describeImageManager.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/DescribeImage
        [HttpPost, DisableRequestSizeLimit]
        public async Task<JsonReturn> Post()
        {
            var response = new JsonReturn();
            var q = _describeImageManager.MapQuestionSetup(Request);
            q.ImagePath=await SaveImageToServer(q, Request.Form.Files[0]);
            response = _describeImageManager.SaveQuestion(q);
            return response;
        }

        private async Task<string> SaveImageToServer( QuestionSetup question, IFormFile file)
        {
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            var f = Directory.GetDirectoryRoot(uploads);

            if (!Directory.Exists(uploads))
            {
                Directory.CreateDirectory(uploads);
            }

            var filePath = string.Empty;
            
            if (file.Length > 0)
            {
                var uFile = Guid.NewGuid().ToString();
                var fileName = Path.GetFileName($"Describe_Image_{question.Id}_{uFile}.{file.FileName.Split(".")[1].ToLower()}");

                filePath = Path.Combine(uploads, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }

            return filePath;
        }
    }
}
