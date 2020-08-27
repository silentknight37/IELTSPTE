import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { Questions, Question, ReadingWritingFillInTheBlanks, QuestionSetup } from 'src/app/shared/common-question';
import { ReOrderParagaphService } from '../re-order-paragaph.service';
import { element } from 'protractor';
import { take, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-re-order-paragaph-display',
  templateUrl: './re-order-paragaph-display.component.html',
  styleUrls: ['./re-order-paragaph-display.component.scss']
})
export class ReOrderParagaphDisplayComponent implements OnInit {
  answerColor:string;
  questionTitle:string;
  openSection=true;
  MANY_ITEMS = 'MANY_ITEMS';
  public many = [];
  public many2 = [];
  public AnswerList=[];
  public questions=new Questions();
  public question=new QuestionSetup();
  public readingWritingFillInTheBlanks=  new ReadingWritingFillInTheBlanks();
  checkAnswerList:string[];

  subs = new Subscription();
  counter$: Observable<number>;
  count = 0;
  presentage=100;
  enableCheckAnswer=true;

  answerListOpacity:string;
  answerListPointer:string;
  timeExpire:boolean;
  correctAnswerDisplay:string;

  constructor(private dragulaService:DragulaService,private reOrderParagaphService:ReOrderParagaphService,private spinner: NgxSpinnerService) { 
    this.subs.add(dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
           
        var filtermany=this.many2.filter(i=>i==item);
        if(filtermany.length==0){
          this.AnswerList.push(el);
        }
        else if(filtermany.length==1){
          var filterList=this.AnswerList.filter(i=>i.innerText!=item.text);
          this.AnswerList=filterList;
        }
        
      })
    );
    this.subs.add(dragulaService.removeModel(this.MANY_ITEMS)
      .subscribe(({ el, source, item, sourceModel }) => {
      })
    );
  }

  ngOnInit() {
    this.spinner.show();
    this.reOrderParagaphService.getByAction('api/ReOrderParagraph').subscribe(res=>{
      this.questions=res.records;
      
       this.readingWritingFillInTheBlanks = res.records.questionList[0].fullQuestion;
       this.question = res.records.questionList[0].questionDetails;
       this.readingWritingFillInTheBlanks.qestion.forEach((el)=>{
        this.many.push(el);
       });
      this.questionTitle=res.records.questionList[0].questionName;
      this.answerListOpacity="1";
      this.answerListPointer="auto";
      this.correctAnswerDisplay="none";
      this.getCheckAnswerList(this.question.question);
      this.spinner.hide();
    },
  error =>{})
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getCheckAnswerList(text:string){
    debugger;
    var answer=text.split(',');
    this.checkAnswerList=answer;
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

  getQestion(question:Question){
    if(this.questionTitle!=question.questionName){
      this.spinner.show();
      this.readingWritingFillInTheBlanks = question.fullQuestion;
      this.many=[];
      this.many2=[];
      this.AnswerList=[];
      this.readingWritingFillInTheBlanks.qestion.forEach((el)=>{
        this.many.push(el);
        
       });
      this.questionTitle=question.questionName;
      this.count=this.readingWritingFillInTheBlanks.timer;
      this.enableCheckAnswer=true;
      this.answerListOpacity="1";
      this.answerListPointer="auto";
      this.correctAnswerDisplay="none";
      this.openSectionSection();
      this.spinner.hide();
    }    
  }

  checkAnswers(){
    for(var i =0; i<this.many2.length;i++){
      var answer=this.many2[i];
      var filterList=this.AnswerList.filter(i=>i.innerText==answer.text);
      if(answer.requestAnswer.id==i+1){
        document.getElementById(filterList[0].id).style.borderColor="green";
      }
      else {
        document.getElementById(filterList[0].id).style.borderColor="red";
      }
      
    }
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