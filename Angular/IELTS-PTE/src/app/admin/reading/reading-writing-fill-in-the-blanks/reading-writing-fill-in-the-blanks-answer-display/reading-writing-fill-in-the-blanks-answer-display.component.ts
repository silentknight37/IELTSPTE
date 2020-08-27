import { Component, OnInit, ViewChild } from '@angular/core';
import { ReadingWritingFillInTheBlanks, Questions, Question } from '../reading-writing-fill-in-blanks';
import { ReadingWritingFillInTheBlanksService } from '../reading-writing-fill-in-the-blanks.service';
import { Answers, QuestionSetup } from 'src/app/shared/common-question';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-reading-writing-fill-in-the-blanks-answer-display',
  templateUrl: './reading-writing-fill-in-the-blanks-answer-display.component.html',
  styleUrls: ['./reading-writing-fill-in-the-blanks-answer-display.component.scss']
})
export class ReadingWritingFillInTheBlanksAnswerDisplayComponent implements OnInit {

  answerColor:string;
  questionTitle:string;
  openSection=true;
  public readingWritingFillInTheBlanks=  new ReadingWritingFillInTheBlanks();
  public questions=new Questions();
  public question=new QuestionSetup();
  public AnswerList=[];
  answerListOpacity:string;
  answerListPointer:string;
  timeExpire:boolean;
  correctAnswerDisplay:string;
  constructor(private readingWritingFillInTheBlanksService:ReadingWritingFillInTheBlanksService,private spinner: NgxSpinnerService) { }

  counter$: Observable<number>;
  count = 0;
  presentage=100;
  enableCheckAnswer=true;

  ngOnInit() {
    this.spinner.show();
    this.readingWritingFillInTheBlanksService.getByAction('api/ReadingWritingFillInTheBlanks').subscribe(res=>{
      this.questions=res.records;
      this.readingWritingFillInTheBlanks = res.records.questionList[0].fullQuestion;
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

  onDropDownChange(item:Answers){
      this.AnswerList.push(item);
  }

  checkAnswers(){
    this.AnswerList.forEach(element => {
     if(element.correctAnswer==element.selectAnswer){
       document.getElementById("drag-drop-"+element.id).style.borderColor="green";
     }
     else{
       document.getElementById("drag-drop-"+element.id).style.borderColor="red";
     }
    });
   }

  getQestion(question:Question){
    debugger;
    this.enableCheckAnswer=true;
    if(this.questionTitle!=question.questionName){
      this.spinner.show();
      this.readingWritingFillInTheBlanks = question.fullQuestion;
      this.question = question.questionDetails;
      this.questionTitle=question.questionName;
      this.count=this.readingWritingFillInTheBlanks.timer;
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
    this.count=this.readingWritingFillInTheBlanks.timer;
    this.counter$ = timer(0,1000).pipe(
      take(this.count),
      map((x) => {
        if(this.count<=0){
          return 0;
        }
        return --this.count
      })
    );
  }
  getPresentage(count:number){
    if(this.count<=0){
      this.enableCheckAnswer=false;
      this.answerListOpacity="0.4";
      this.answerListPointer="none";
      this.correctAnswerDisplay="contents";
    }
    var n=(count/this.readingWritingFillInTheBlanks.timer)*100;
    return n;
  }
}
