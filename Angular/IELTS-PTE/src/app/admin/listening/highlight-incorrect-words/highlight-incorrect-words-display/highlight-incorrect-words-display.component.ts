import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { Questions, QuestionSetup, ReadingWritingFillInTheBlanks, Answers, Question } from 'src/app/shared/common-question';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { take, map } from 'rxjs/operators';
@Component({
  selector: 'app-highlight-incorrect-words-display',
  templateUrl: './highlight-incorrect-words-display.component.html',
  styleUrls: ['./highlight-incorrect-words-display.component.scss']
})
export class HighlightIncorrectWordsDisplayComponent implements OnInit {

  
  
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
    constructor(private fb: FormBuilder,private commonService:CommonService,private fs:SpeechSynthesisUtteranceFactoryService,private svc:SpeechSynthesisService,private domSanitizer: DomSanitizer,private spinner: NgxSpinnerService){}

  
    ngOnInit() {
      this.spinner.show();
      this.commonService.getByAction('api/HighlightIncorrectWords').subscribe(res=>{
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
        this.AnswerList.push(item);
    }
  
     getQestion(question:Question){
       this.url='';
       this.recording=false;
      if(this.questionTitle!=question.questionName){
        this.answerColor="black";
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
  // checkAnswers(){
  //   debugger;
  //   var answer=this.answerForm.value.answerAudio;
  //   if(answer==null || answer!=this.question.question.trim()){
  //     this.answerColor="red";
  //   }

  //   if(answer==this.question.question.trim()){
  //     this.answerColor="green";
  //   }
    
  // }

  checkAnswers(){
    debugger;
    
    this.AnswerList.forEach(element => {
     if(element.requestAnswer.selectAnswer=="" && element.requestAnswer.correctAnswer==""){
      document.getElementById("text-highlight-"+element.requestAnswer.id).style.backgroundColor="transparent";
     }
     else if(element.requestAnswer.correctAnswer==element.requestAnswer.selectAnswer){
       document.getElementById("text-highlight-"+element.requestAnswer.id).style.backgroundColor="green";
     }
     else if(element.requestAnswer.selectAnswer==""){
      document.getElementById("text-highlight-"+element.requestAnswer.id).style.backgroundColor="transparent";
     }
     else{
       document.getElementById("text-highlight-"+element.requestAnswer.id).style.backgroundColor="red";
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
    }
    var n=(count/this.question.timer)*100;
    return n;
  }

}
