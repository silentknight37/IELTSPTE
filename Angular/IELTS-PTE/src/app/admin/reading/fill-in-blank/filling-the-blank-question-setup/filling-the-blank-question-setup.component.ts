import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Answer, QuestionSetup } from '../filling-the-blank-answer-display/fillInBlanks';
import { ReadingFillingTheBlanksService } from '../reading-filling-the-blanks.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-filling-the-blank-question-setup',
  templateUrl: './filling-the-blank-question-setup.component.html',
  styleUrls: ['./filling-the-blank-question-setup.component.scss']
})
export class FillingTheBlankQuestionSetupComponent implements OnInit {

  questionDetails:QuestionSetup;
  public answersList=[];
  answers:Answer;
  question = new QuestionSetup();
  answerForm: FormGroup;
  questionForm: FormGroup;
  response:any;
  responseMessage:string;
  successResponse:boolean;
  responseClass:string;
  submitted = false;  
  id:number;
  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder,private fillingTheBlanksService:ReadingFillingTheBlanksService) { 

  }

  ngOnInit() {
    debugger;
    this.checkConductorViewOrCreate();
    if(this.questionDetails!=null){
      this.answersList=this.questionDetails.answerList;
      this.createQuestionForm(this.questionDetails);
    }
    else{
      this.answersList=[];
      this.createQuestionForm(null);
    }   
    this.createAnswerForm();
  }

  createAnswerForm() {
    this.answerForm = this.fb.group({
      answerName:['',Validators.required]
    });
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

  addAnswers(){
    
    if(this.answerForm.invalid)
    {
      return;
    }
    this.answers = Object.assign({},this.answers,this.answerForm.value);

    if(this.answersList.filter(i=>i==this.answers.answerName).length>=1)
    {
      return;
    }
    this.answersList.push(this.answers.answerName);
    this.createAnswerForm();
  }

  saveQuestion(){
    debugger;
    this.submitted=true;
    if(this.questionForm.invalid){
      return;
    }

    if(this.answersList.length<=0){
      return;
    }

    this.question=Object.assign({},this.question,this.questionForm.value);
    debugger;
    this.question.answerList=this.answersList;

    if(this.questionDetails!=null){
      this.question.id=this.questionDetails.id;
    }

    this.fillingTheBlanksService.createwithAction(this.question,'api/FillingTheBlanks').subscribe(res=>{
      this.response = res;
      this.responseMessage=this.response.message;
      this.successResponse=true;
      this.responseClass="successResponse";
      if(this.questionDetails==null){
        this.answersList=[];
        this.createQuestionForm(null);
      }
    },
  error =>{
    this.responseMessage=error;
    this.successResponse=false;
    this.responseClass="errorResponse";
  })
    
  
  }

  removeAnswer(item:string){
    var filterList=this.answersList.filter(i=>i!=item);
    this.answersList=filterList;
  }

  back(){
    window.location.href="#/admin/filling-the-blanks/list";
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
    this.fillingTheBlanksService.getByAction('api/FillingTheBlanks/'+id).subscribe(res=>{
      this.question=res.records;
      this.createQuestionForm(this.question);
      this.answersList=res.records.answerList;
    },
  error =>{})
  }

}
