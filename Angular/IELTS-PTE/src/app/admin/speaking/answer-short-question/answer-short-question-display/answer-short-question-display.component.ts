import { Component, OnInit } from '@angular/core';
import { Questions, QuestionSetup, Question, Answers, ReadingWritingFillInTheBlanks } from 'src/app/shared/common-question';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { SpeechSynthesisUtteranceFactoryService, SpeechSynthesisService } from '@kamiazya/ngx-speech-synthesis';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import * as RecordRTC from 'recordrtc';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-answer-short-question-display',
  templateUrl: './answer-short-question-display.component.html',
  styleUrls: ['./answer-short-question-display.component.scss']
})
export class AnswerShortQuestionDisplayComponent implements OnInit {

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
  
    //Will use this flag for detect recording
    public recording = false;
    //Url of Blob
    public url;
    public error;
    constructor(private fb: FormBuilder,private commonService:CommonService,private fs:SpeechSynthesisUtteranceFactoryService,private svc:SpeechSynthesisService,private domSanitizer: DomSanitizer,private spinner: NgxSpinnerService){}

  
    ngOnInit() {
      this.spinner.show();
      this.commonService.getByAction('api/AnswerShortQuestion').subscribe(res=>{
        this.questions=res.records;
        this.question = res.records.questionList[0].questionDetails;
        this.questionTitle=res.records.questionList[0].questionName;
        this.readingWritingFillInTheBlanks = res.records.questionList[0].fullQuestion;
        this.createQuestionForm();
        this.spinner.hide();
      },
    error =>{})
    }
    checkAnswer(){
      this.showAnswer=true;
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
  async successCallback(stream) {
      var options = {
          mimeType: "audio/wav",
          numberOfAudioChannels: 1
      };
      //Start Actuall Recording
      var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
      
      this.record = new StereoAudioRecorder(stream, options);
      this.record.record();
      const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);
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
    // const a=document.createElement('a');
    // //a.style.display='none';
    // a.text='testURL';
    // a.target='_blank';
    // a.href=this.url;
    // a.download='test.mp3';
    // document.body.appendChild(a);
    // a.click();
  
    // let au=new Audio(this.url);
    // au.controls = true;
    //     document.body.appendChild(au);
    //     au.play();
       
        debugger;
        var blob=this.record.blob;
        var fileType = blob.type.split('/')[0] || 'audio';
        var fileName = (Math.random() * 1000).toString().replace('.', '');
        if (fileType === 'audio') {
            fileName += '.wav';
        } else {
            fileName += '.webm';
        }
        blob.fileName=this.url;
        var formData = new FormData();
        // formData.append(fileType + '-filename', fileName);
        // formData.append(fileType + '-blob', blob);
  formData.append(fileName,blob);
  
        // var f=new FileReader();
        // f.readAsDataURL(this.url);
        // f.onload=function(){
        //   var fd=new FormData();
        //   var base64data=f.result.toString();
        //   fd.append('file',,'test.mp3')
        // }
    this.commonService.createwithFileAction(formData,'api/RepeatSentence/SendAnswer').subscribe(res=>{
      this.response = res;
      this.responseMessage=this.response.message;
      this.successResponse=true;
      this.responseClass="successResponse";
    },
  error =>{
    this.responseMessage=error;
    this.successResponse=false;
    this.responseClass="errorResponse";
  })
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
    }
    var n=(count/this.question.timer)*100;
    return n;
  }

}
