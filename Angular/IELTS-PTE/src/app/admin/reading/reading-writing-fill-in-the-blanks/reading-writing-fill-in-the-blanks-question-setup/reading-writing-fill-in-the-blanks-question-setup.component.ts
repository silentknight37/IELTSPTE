import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReadingWritingFillInTheBlanksService } from '../reading-writing-fill-in-the-blanks.service';
import { QuestionSetup } from '../reading-writing-fill-in-blanks';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reading-writing-fill-in-the-blanks-question-setup',
  templateUrl: './reading-writing-fill-in-the-blanks-question-setup.component.html',
  styleUrls: ['./reading-writing-fill-in-the-blanks-question-setup.component.scss']
})
export class ReadingWritingFillInTheBlanksQuestionSetupComponent implements OnInit {

  submitted = false;
  questionForm: FormGroup;
  response:any;
  responseMessage:string;
  successResponse:boolean;
  responseClass:string;
  question = new QuestionSetup();
  id:number;
  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder,private readingWritingFillInTheBlanksService:ReadingWritingFillInTheBlanksService) { }

  ngOnInit() {
    this.checkConductorViewOrCreate();
    if(this.question!=null){
      this.createQuestionForm(this.question);
    }
    else{
      this.createQuestionForm(null);
    }   
  }

  createQuestionForm(question:QuestionSetup){
    if(question!=null){
    this.questionForm=this.fb.group({
      subject:[question.subject,Validators.required],
        question:[question.question,Validators.required],
        timer:[question.timer,Validators.required],
        isFree:[question.isFree],
        status:[question.status]
    });
  }
  else{
    this.questionForm=this.fb.group({
      subject:['',Validators.required],
      question:['',Validators.required],
      timer:['',Validators.required],
      isFree:[false],
      status:[true]
    });
  }
  }

  get f() { return this.questionForm.controls; }

  
  saveQuestion(){
    this.submitted=true;
    if(this.questionForm.invalid){
      return;
    }

    this.question=Object.assign({},this.question,this.questionForm.value);
    debugger;


    this.readingWritingFillInTheBlanksService.createwithAction(this.question,'api/ReadingWritingFillInTheBlanks').subscribe(res=>{
      this.response = res;
      this.responseMessage=this.response.message;
      this.successResponse=true;
      this.responseClass="successResponse";
        this.createQuestionForm(null);
        this.submitted=false;
    },
  error =>{
    this.responseMessage=error;
    this.successResponse=false;
    this.responseClass="errorResponse";
  })
    
  
  }

  back(){
    window.location.href="admin/reading-writing-fill-in-blanks/list";
  }

  checkConductorViewOrCreate() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id != undefined) {
        this.getQuestionById(this.id);
      }
    })
    
  }

  getQuestionById(id:number){
    this.readingWritingFillInTheBlanksService.getByAction('api/ReadingWritingFillInTheBlanks/'+id).subscribe(res=>{
      this.question=res.records;
      this.createQuestionForm(this.question);
    },
  error =>{})
  }
}
