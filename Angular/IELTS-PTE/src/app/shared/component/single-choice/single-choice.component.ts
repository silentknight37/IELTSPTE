import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnswersForSelectChoice } from '../../common-question';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss']
})
export class SingleChoiceComponent implements OnInit {

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
