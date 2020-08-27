import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { Questions, QuestionSetup, ReadingWritingFillInTheBlanks, Answers, Question } from 'src/app/shared/common-question';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-select-missing-word-display',
  templateUrl: './select-missing-word-display.component.html',
  styleUrls: ['./select-missing-word-display.component.scss']
})
export class SelectMissingWordDisplayComponent implements OnInit {

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
      private spinner: NgxSpinnerService){}

  
    ngOnInit() {
      this.spinner.show();
      this.commonService.getByAction('api/SelectMissingWord').subscribe(res=>{
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
      
      this.svc.speak(this.fs.text(this.question.question));
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
        this.svc.speak(this.fs.text(this.question.question));
        this.count=this.question.timer;
        this.enableCheckAnswer=true;
        this.showAnswer=false;
        this.showCheck=false;
        this.spinner.hide();
      }    
    }
  
    sanitize(url:string){
      return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  
    initiateRecording() {
      this.url='';
      this.recording = true;
      let mediaConstraints = {
          video: false,
          audio: true
      };
      navigator.mediaDevices
          .getUserMedia(mediaConstraints)
          .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  
  
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
      var options = {
          mimeType: "audio/wav",
          numberOfAudioChannels: 1
      };
      //Start Actuall Recording
      var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
      
      this.record = new StereoAudioRecorder(stream, options);
      this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
      this.recording = false;
      this.record.stop(this.processRecording.bind(this));
      this.showCheck=true;
  }
  createQuestionForm(){
    this.answerForm=this.fb.group({
      answerAudio:[]
    }); 
  }


  checkAnswers(){
    debugger;
    
    this.AnswerList.forEach(element => {
     if(element.requestAnswer.selectAnswer!="" && element.requestAnswer.correctAnswer==element.requestAnswer.selectAnswer){
      
       document.getElementById("redio-"+element.requestAnswer.id).style.borderColor="green";
       element.requestAnswer.selectAnswer="";
     }
     else if(element.requestAnswer.selectAnswer!="" && element.requestAnswer.correctAnswer==""){
      
       document.getElementById("redio-"+element.requestAnswer.id).style.borderColor="red";
       element.requestAnswer.selectAnswer="";
     }

     if(!this.enableCheckAnswer && element.requestAnswer.correctAnswer!=""){
      document.getElementById("redio-"+element.requestAnswer.id).style.borderColor="green";
     }
    });
   }

  listenAgain(){
    this.svc.speak(this.fs.text(this.question.question));
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    debugger;
      this.url = URL.createObjectURL(blob);
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    debugger;
      this.error = 'Can not play audio in your browser';
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
