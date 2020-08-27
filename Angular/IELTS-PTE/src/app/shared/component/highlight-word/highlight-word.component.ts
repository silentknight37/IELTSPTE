import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Answers, RequestText } from '../../common-question';

@Component({
  selector: 'app-highlight-word',
  templateUrl: './highlight-word.component.html',
  styleUrls: ['./highlight-word.component.scss']
})
export class HighlightWordComponent implements OnInit {
  
  @Input() requestText:RequestText;
  @Output() responseAnswer: EventEmitter<RequestText> = new EventEmitter<RequestText>();
  textBackground:string;
  constructor() { }

  ngOnInit() {
    this.responseAnswer.emit(this.requestText);
  }

  onclick(){
    debugger;
    if(this.requestText.requestAnswer.selectAnswer==""){
      this.textBackground="yellow";
      this.requestText.requestAnswer.selectAnswer=this.requestText.text;
    }
    else{
      this.textBackground="transparent";
      this.requestText.requestAnswer.selectAnswer="";
    }
    this.responseAnswer.emit(this.requestText);
  }

}
