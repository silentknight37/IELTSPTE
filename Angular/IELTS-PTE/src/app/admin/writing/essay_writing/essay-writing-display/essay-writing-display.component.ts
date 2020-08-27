import { Component, OnInit } from '@angular/core';
import { Questions, QuestionSetup, ReadingWritingFillInTheBlanks, ReviewEmail, Answers, Question } from 'src/app/shared/common-question';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionSetupServiceService } from 'src/app/shared/services/question-setup-service.service';
import { take, map } from 'rxjs/operators';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-essay-writing-display',
  templateUrl: './essay-writing-display.component.html',
  styleUrls: ['./essay-writing-display.component.scss']
})
export class EssayWritingDisplayComponent implements OnInit {

  
  answerColor:string;
  questionTitle:string;
  openSection=true;
  public questions=new Questions();
  public question=new QuestionSetup();
  public AnswerList=[];
  answerForm: FormGroup;
  response:any;
  responseMessage:string;
  successResponse:boolean;
  responseClass:string;
  public readingWritingFillInTheBlanks=  new ReadingWritingFillInTheBlanks();
  counter$: Observable<number>;
  count = 0;
  presentage=100;
  public record;
  enableCheckAnswer=true;
  showAnswer=false;
  showCheck=false;
  answerListOpacity:string;
  answerListPointer:string;
  timeExpire:boolean;
  correctAnswerDisplay:string;
  reviewEmail=new ReviewEmail();
  
    //Will use this flag for detect recording
    public recording = false;
    //Url of Blob
    public url;
    public error;
    constructor(private fb: FormBuilder,
      private commonService:CommonService,
      private fs:SpeechSynthesisUtteranceFactoryService,
      private svc:SpeechSynthesisService,
      private domSanitizer: DomSanitizer,
      private spinner: NgxSpinnerService,
      private questionSetupService:QuestionSetupServiceService){}

  
    ngOnInit() {
      this.spinner.show();
      this.commonService.getByAction('api/WritingEssay').subscribe(res=>{
        this.questions=res.records;
        this.question = res.records.questionList[0].questionDetails;
        this.questionTitle=res.records.questionList[0].questionName;
        this.readingWritingFillInTheBlanks = res.records.questionList[0].fullQuestion;
        this.createQuestionForm();
        this.answerListOpacity="1";
        this.answerListPointer="auto";
        this.correctAnswerDisplay="none";
        this.timeExpire=false;
        this.spinner.hide();
      },
    error =>{})
    }
    
    openSectionSection(){
      debugger
      this.openSection=false;
      this.count=this.question.timer;
      this.counter$ = timer(0,1000).pipe(
        take(this.count),
        map((x) => {
          if(this.count<=0){
            return 0;
          }
          return --this.count
        })
      );
      new Promise(x=>{
        setTimeout(()=>{
        },(this.question.timer/2)*500)
      })
      
    }
  
    onDropDownChange(item:Answers){
      debugger;
      
      this.AnswerList.forEach(element => {
        document.getElementById("redio-"+element.requestAnswer.id).style.border="1px solid";
       document.getElementById("redio-"+element.requestAnswer.id).style.borderColor="transparent";
      });
    
        this.AnswerList.push(item);
  }
  
     getQestion(question:Question){
       this.url='';
       this.recording=false;
      if(this.questionTitle!=question.questionName){
        this.spinner.show();
        this.question = question.questionDetails;
        this.questionTitle=question.questionName;
        this.count=this.question.timer;
        this.enableCheckAnswer=true;
        this.showAnswer=false;
        this.showCheck=false;
        this.spinner.hide();
      }    
    }

  createQuestionForm(){
    this.answerForm=this.fb.group({
      summariesText:[]
    }); 
  }

  sendReview(){
    if(this.answerForm.invalid){
      return;
    }
    this.reviewEmail.reviewText=this.answerForm.value.summariesText;
    this.reviewEmail.reviewQuestion=this.questionTitle;
    
    this.questionSetupService.createwithAction(this.reviewEmail,"api/SummariesSpokenText/SendReview").subscribe(res=>{
      this.response = res;   
    },
  error =>{
    this.responseMessage=error;
    this.successResponse=false;
    this.responseClass="errorResponse";
  })
    
  
  }

  checkAnswers(){
    debugger;
    this.enableCheckAnswer=false;
   }

  getPresentage(count:number){
    if(this.count<=0){
      this.enableCheckAnswer=false;
      this.answerListOpacity="0.4";
      this.answerListPointer="none";
      this.correctAnswerDisplay="contents";
      this.checkAnswers();
    }
    var n=(count/this.question.timer)*100;
    return n;
  }
}
