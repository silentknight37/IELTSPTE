import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answers, RequestTextForSelectChoice, AnswersForSelectChoice } from '../../common-question';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {

  @Input() requestAnswer:AnswersForSelectChoice;
  @Output() responseAnswer: EventEmitter<AnswersForSelectChoice> = new EventEmitter<AnswersForSelectChoice>();

  public AnswerList=[];
  constructor() { }

  ngOnInit() {
    this.responseAnswer.emit(this.requestAnswer);
  }

  onCheckChange(val){
    //this.AnswerList.push(val);
    debugger;
    val.selected=true;
    this.responseAnswer.emit(val);
  }

}
