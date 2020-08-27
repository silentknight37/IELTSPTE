﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IELTS_PTE.DataAccess
{
    [Table("Speaking_AnswerShort")]
    public partial class SpeakingAnswerShort
    {
        [Column("id")]
        public int Id { get; set; }
        public string Subject { get; set; }
        public string ParagraghText { get; set; }
        public int? Questiontime { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsFree { get; set; }
        public string CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }
    }
}