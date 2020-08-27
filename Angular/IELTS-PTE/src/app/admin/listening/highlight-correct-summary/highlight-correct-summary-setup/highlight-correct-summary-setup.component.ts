import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-highlight-correct-summary-setup',
  templateUrl: './highlight-correct-summary-setup.component.html',
  styleUrls: ['./highlight-correct-summary-setup.component.scss']
})
export class HighlightCorrectSummarySetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/HighlightCorrectSummary';
    this.requestedURLs.backURL='admin/'+"highlight-correct-summary";
    this.requestedURLs.title='Highlight Correct Summary';
    this.requestedURLs.istts=false;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text [[correct-answer],[other-answer1],[other-answer2],[other-answer3]]";
  }

}
