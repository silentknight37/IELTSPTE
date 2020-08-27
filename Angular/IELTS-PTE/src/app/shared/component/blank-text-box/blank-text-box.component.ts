import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answers } from '../../common-question';

@Component({
  selector: 'app-blank-text-box',
  templateUrl: './blank-text-box.component.html',
  styleUrls: ['./blank-text-box.component.scss']
})
export class BlankTextBoxComponent implements OnInit {
  @Input() requestAnswer: Answers; 
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
