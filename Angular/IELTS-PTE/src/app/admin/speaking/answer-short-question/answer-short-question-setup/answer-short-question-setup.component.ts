import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-answer-short-question-setup',
  templateUrl: './answer-short-question-setup.component.html',
  styleUrls: ['./answer-short-question-setup.component.scss']
})
export class AnswerShortQuestionSetupComponent implements OnInit {
  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/AnswerShortQuestion';
    this.requestedURLs.backURL='admin/'+"answer-short-question";
    this.requestedURLs.title='Answer Short Question';
    this.requestedURLs.istts=true;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text [shortAnswer]";
  }


}
