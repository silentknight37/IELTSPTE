import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestText } from '../../common-question';

@Component({
  selector: 'app-select-single-redio',
  templateUrl: './select-single-redio.component.html',
  styleUrls: ['./select-single-redio.component.scss']
})
export class SelectSingleRedioComponent implements OnInit {

  @Input() requestText:RequestText;
  @Output() responseAnswer: EventEmitter<RequestText> = new EventEmitter<RequestText>();
  textBackground:string;
  constructor() { }

  ngOnInit() {
    this.responseAnswer.emit(this.requestText);
  }

  onclick(){
    debugger;
    this.requestText.requestAnswer.selectAnswer=this.requestText.text;
    this.responseAnswer.emit(this.requestText);
  }

}
