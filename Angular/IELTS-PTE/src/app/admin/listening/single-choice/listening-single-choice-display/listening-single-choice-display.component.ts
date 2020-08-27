import { Component, OnInit } from '@angular/core';
import { SelectChoiceQuestions, Questions, QuestionSetup, AnswersForSelectChoice, QuestionForSelect } from 'src/app/shared/common-question';
import { ReadingWritingFillInTheBlanksService } from 'src/app/admin/reading/reading-writing-fill-in-the-blanks/reading-writing-fill-in-the-blanks.service';
import { Observable, timer } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { take, map } from 'rxjs/operators';
import { SpeechSynthesisService, SpeechSynthesisUtteranceFactoryService } from '@kamiazya/ngx-speech-synthesis';

@Component({
  selector: 'app-listening-single-choice-display',
  templateUrl: './listening-single-choice-display.component.html',
  styleUrls: ['./listening-single-choice-display.component.scss']
})
export class ListeningSingleChoiceDisplayComponent implements OnInit {

  
  
  answerColor:string;
  questionTitle:string;
  openSection=true;
  public selectChoiceQuestions=  new SelectChoiceQuestions();
  public questions=new Questions();
  public question=new QuestionSetup();
  public Answer;
  answerListOpacity:string;
  answerListPointer:string;
  timeExpire:boolean;
  correctAnswerDisplay:string;
  constructor(private svc:SpeechSynthesisService,private fs:SpeechSynthesisUtteranceFactoryService,private readingWritingFillInTheBlanksService:ReadingWritingFillInTheBlanksService,private spinner: NgxSpinnerService) { }

  counter$: Observable<number>;
  count = 0;
  presentage=100;
  enableCheckAnswer=true;

  ngOnInit() {
    this.spinner.show();
    this.readingWritingFillInTheBlanksService.getByAction('api/ListeningSingleChoice').subscribe(res=>{
      this.questions=res.records;
      this.selectChoiceQuestions = res.records.questionList[0].fullQuestion;
      this.question = res.records.questionList[0].questionDetails;
      this.questionTitle=res.records.questionList[0].questionName;
      this.answerListOpacity="1";
      this.answerListPointer="auto";
      this.correctAnswerDisplay="none";
      this.timeExpire=false;
      this.spinner.hide();
    },
  error =>{})
  }

  onCheckChange(item:AnswersForSelectChoice){
    debugger;
    if(item.selected){
      this.Answer=item;
    }
  }

  checkAnswers(){

      var answerList=this.selectChoiceQuestions.qestion.forEach(i=>{
        if(i.textType==2){
          i.requestAnswer.forEach(el=>{
            //var correct= this.Answer.find(x=>x.id==el.id);
            
           
          if(el.isCorrectAnswers){
   
           document.getElementById("single-choice-lable-"+el.id).style.color="green";
           document.getElementById("single-choice-"+el.id).style.outline="2px solid green";
          }
          else if(this.Answer.id==el.id && !this.Answer.isCorrectAnswers){
           document.getElementById("single-choice-lable-"+el.id).style.color="red";
           document.getElementById("single-choice-"+el.id).style.outline="2px solid red";
          }
         });
        }
      });
      
   }
   listenAgain(){
    var text=this.selectChoiceQuestions.qestion.find(i=>i.textType==1);
    this.svc.speak(this.fs.text(text.text));
  }

  getQestion(question:QuestionForSelect){
    debugger;
    this.enableCheckAnswer=true;
    if(this.questionTitle!=question.questionName){
      this.spinner.show();
      this.selectChoiceQuestions = question.fullQuestion;
      this.question = question.questionDetails;
      this.questionTitle=question.questionName;
      this.count=this.selectChoiceQuestions.timer;
      this.enableCheckAnswer=true;
      this.answerListOpacity="1";
      this.answerListPointer="auto";
      this.correctAnswerDisplay="none";
      this.timeExpire=false;
      this.openSectionSection();
      this.spinner.hide();
    }    
  }
  openSectionSection(){
    this.openSection=false;
    this.count=this.selectChoiceQuestions.timer;
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
    debugger;
    var text=this.selectChoiceQuestions.qestion.find(i=>i.textType==1);
    this.svc.speak(this.fs.text(text.text));
  }
  getPresentage(count:number){
    if(this.count<=0){
      this.enableCheckAnswer=false;
      this.answerListOpacity="0.4";
      this.answerListPointer="none";
      this.correctAnswerDisplay="contents";
      this.checkAnswers();
    }
    var n=(count/this.selectChoiceQuestions.timer)*100;
    return n;
  }

}
