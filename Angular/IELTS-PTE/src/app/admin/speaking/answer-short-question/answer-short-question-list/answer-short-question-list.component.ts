import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-answer-short-question-list',
  templateUrl: './answer-short-question-list.component.html',
  styleUrls: ['./answer-short-question-list.component.scss']
})
export class AnswerShortQuestionListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/AnswerShortQuestion';
    this.requestedURLs.backURL='admin/'+"answer-short-question";
    this.requestedURLs.title='Answer Short Question';
  }

}
