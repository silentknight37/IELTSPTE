import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Answers } from '../../common-question';

@Component({
  selector: 'app-blank-drop-down',
  templateUrl: './blank-drop-down.component.html',
  styleUrls: ['./blank-drop-down.component.scss']
})
export class BlankDropDownComponent implements OnInit {

  @Input() requestAnswer:Answers;
  @Output() responseAnswer: EventEmitter<Answers> = new EventEmitter<Answers>();
  constructor() { }

  ngOnInit() {
    this.responseAnswer.emit(this.requestAnswer);
  }

  onDropDownChange(val){
    this.requestAnswer.selectAnswer=val;
    this.responseAnswer.emit(this.requestAnswer);
  }

}
