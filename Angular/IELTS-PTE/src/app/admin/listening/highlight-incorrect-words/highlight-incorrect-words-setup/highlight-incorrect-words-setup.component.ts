import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-highlight-incorrect-words-setup',
  templateUrl: './highlight-incorrect-words-setup.component.html',
  styleUrls: ['./highlight-incorrect-words-setup.component.scss']
})
export class HighlightIncorrectWordsSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/HighlightIncorrectWords';
    this.requestedURLs.backURL='admin/'+"highlight-incorrect-words";
    this.requestedURLs.title='Highlight Incorrect Words';
    this.requestedURLs.istts=false;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text [answer 1,incorrect 1] question text [answer 2,incorrect 2]";
  }
}
