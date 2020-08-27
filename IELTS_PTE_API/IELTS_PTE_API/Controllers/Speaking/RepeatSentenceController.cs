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

namespace IELTS_PTE_API.Controllers.Speaking
{
    public class AudioFile
    {
        public Stream entityData { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class RepeatSentenceController : ControllerBase
    {
        private RepeatSentenceManager _repeatSentenceManager = new RepeatSentenceManager();

        // GET: api/RepeatSentence
        [HttpGet]
        public JsonReturn Get()
        {
            var response = new JsonReturn();
            Questions questions = _repeatSentenceManager.GetQuestions();
            response.Records = questions;
            return response;
        }

        // GET: api/RepeatSentence/5
        [HttpGet("{id}")]
        public JsonReturn Get(int id)
        {
            var response = new JsonReturn();
            QuestionSetup questions = _repeatSentenceManager.GetQuestionsById(id);
            response.Records = questions;
            return response;
        }

        // POST: api/RepeatSentence
        [HttpPost]
        public JsonReturn Post([FromBody] QuestionSetup value)
        {
            var response = new JsonReturn();
            response = _repeatSentenceManager.SaveQuestion(value);
            return response;
        }

        [HttpPost]

        [Route("SendAnswer")]
        public async Task SendAnswer([FromForm] IFormFile fileSend )
        {
            object audioFile1 = Request.Form.Files;//Form["file"].FirstOrDefault();
            var myBytes=await GetByteArrayFromImageAsync(Request.Form.Files[0]);


            var files = HttpContext.Request.Form.Files;
            

            //var filePath = Path.GetTempFileName();
            //foreach (var formFile in Request.Form.Files)
            //{
            //    if (formFile.Length > 0)
            //    {
            //        using (var inputStream = new FileStream(filePath, FileMode.Create))
            //        {
            //            // read file to stream
            //            await formFile.CopyToAsync(inputStream);
            //            // stream to byte array
            //            byte[] array = new byte[inputStream.Length];
            //            inputStream.Seek(0, SeekOrigin.Begin);
            //            inputStream.Read(array, 0, array.Length);
            //            // get file name
            //            string fName = formFile.FileName;
            //        }
            //    }
            //}

            var audioFile = Request.Form["file"].FirstOrDefault();
            byte[] file;
            using (var stream = new FileStream(audioFile, FileMode.Open, FileAccess.Read))
            {
                using (var reader = new BinaryReader(stream))
                {
                    file = reader.ReadBytes((int)stream.Length);
                }
            }

            //var a = HttpUtility.UrlDecodeToBytes(audioFile);

            //SendEmail("shanaka.kariyawasam@gmail.com", "Shanaka", audioFile);

            //System.IO.MemoryStream mStrm = new System.IO.MemoryStream(a);

            //System.IO.File.WriteAllBytes(@"D:\Temp\myFile.mp3", bytes);

            var response = new JsonReturn();
            response = _repeatSentenceManager.SaveAnswer(audioFile);
            //return response;
        }


        private async Task<byte[]> GetByteArrayFromImageAsync(IFormFile file)
        {
            using (var target = new MemoryStream())
            {
                await file.CopyToAsync(target);
                return target.ToArray();
            }
        }
        private byte[] GetAudio(string url)
        {
            Stream stream = null;
            byte[] buf;

            try
            {
                WebProxy myProxy = new WebProxy();
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);

                HttpWebResponse response = (HttpWebResponse)req.GetResponse();
                stream = response.GetResponseStream();

                using (BinaryReader br = new BinaryReader(stream))
                {
                    int len = (int)(response.ContentLength);
                    buf = br.ReadBytes(len);
                    br.Close();
                }

                stream.Close();
                response.Close();
            }
            catch (Exception exp)
            {
                buf = null;
            }

            return (buf);
        }

        private const string EmailSubject = "Your PTE Account is Confirmed";
        private const string FromEmail = "ieltsptetest@gmail.com";

        public static void SendEmail(string toEmailAddress, string firstName, string url)
        {
            MailMessage mailMessage = new MailMessage(FromEmail, toEmailAddress);
            mailMessage.Subject = EmailSubject;
            mailMessage.IsBodyHtml = true;
            string body = "Hello, " + firstName + "\n Your IELTS PTE Account about to activate click the link  to complete the actination process \n <a href=\'blob:" + url + "'> Active </a>";// "<a href=\'" +url+"'> Review </a>";
            mailMessage.Body = string.Format(body, toEmailAddress);
            
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = "ieltsptetest@gmail.com",
                Password = "Welcome@123",
            };

            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);
        }

        // PUT: api/RepeatSentence/5
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
