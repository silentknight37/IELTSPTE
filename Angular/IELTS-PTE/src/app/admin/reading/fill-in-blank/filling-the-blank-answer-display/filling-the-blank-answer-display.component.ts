import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import { Subscription, Observable, timer } from 'rxjs';

import { FillInBlanks, Answers, Questions, Question } from './fillInBlanks';
import { ReadingFillingTheBlanksService } from '../reading-filling-the-blanks.service';
import { take, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionSetup } from 'src/app/shared/common-question';



@Component({
  selector: 'app-filling-the-blank-answer-display',
  templateUrl: './filling-the-blank-answer-display.component.html',
  styleUrls: ['./filling-the-blank-answer-display.component.scss']
})

export class FillingTheBlankAnswerDisplayComponent implements OnInit {

  MANY_ITEMS = 'MANY_ITEMS';
  public answersList = [];
  answerColor:string;
  questionTitle:string;
  openSection=true;
  answerListOpacity:string;
  answerListPointer:string;
  timeExpire:boolean;
  correctAnswerDisplay:string;
  

  public AnswerList=[];
  public element:HTMLElement;

  public fillInBlank=  new FillInBlanks();
  public questions=new Questions();
  public question=new QuestionSetup();

  public subs = new Subscription();
  counter$: Observable<number>;
   count = 0;
   presentage=100;
   enableCheckAnswer=true;

  public constructor(private dragulaService:DragulaService,private fillingTheBlanksService:ReadingFillingTheBlanksService,private spinner: NgxSpinnerService) {
    
    this.subs.add(dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        
        this.answerColor="#000";
      })
    );
    this.subs.add(dragulaService.removeModel(this.MANY_ITEMS)
      .subscribe(({ el, source, item, sourceModel }) => {
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {  
    this.spinner.show();
    debugger;
    this.fillingTheBlanksService.getByAction('api/FillingTheBlanks').subscribe(res=>{
      this.questions=res.records;
      this.question = res.records.questionList[0].questionDetails;
      this.fillInBlank = res.records.questionList[0].fullQuestion;
      this.answersList=this.fillInBlank.answers;
      this.questionTitle=res.records.questionList[0].questionName;
      this.answerListOpacity="1";
      this.answerListPointer="auto";
      this.correctAnswerDisplay="none";
      
      this.timeExpire=false;
      this.spinner.hide();
    },
  error =>{})
    
  }

  checkAnswers(){
   this.AnswerList.forEach(element => {
    if(element.correctAnswer==element.selectAnswer){
      document.getElementById("drag-drop-"+element.id).style.color="green";
    }
    else{
      document.getElementById("drag-drop-"+element.id).style.color="red";
    }
   });
  }

  onAnswersDropChange(item:Answers){
    if(!item.isRemove){
      this.AnswerList.push(item);
    }
    else{
      document.getElementById("drag-drop-"+item.id).style.color="#000";
      var filterList=this.AnswerList.filter(i=>i.id!=item.id);
      this.AnswerList=filterList;
    }
  }

  getQestion(question:Question){
    
    if(this.questionTitle!=question.questionName){
      this.spinner.show();
      this.fillInBlank = question.fullQuestion;
      this.answersList=this.fillInBlank.answers;
      this.question = question.questionDetails;
      this.questionTitle=question.questionName;
      this.count=this.fillInBlank.timer;
      this.enableCheckAnswer=true;
      this.answerListOpacity="1";
      this.answerListPointer="auto";
      this.correctAnswerDisplay="none";
      this.openSectionSection();
      this.timeExpire=false;
      this.spinner.hide();
    }    
  }
  openSectionSection(){
    this.openSection=false;
    this.count=this.fillInBlank.timer;
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
    var n=(count/this.fillInBlank.timer)*100;
    return n;
  }
}

