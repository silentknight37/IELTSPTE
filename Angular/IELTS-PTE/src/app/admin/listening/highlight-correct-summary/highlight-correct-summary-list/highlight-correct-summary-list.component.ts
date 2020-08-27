import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-highlight-correct-summary-list',
  templateUrl: './highlight-correct-summary-list.component.html',
  styleUrls: ['./highlight-correct-summary-list.component.scss']
})
export class HighlightCorrectSummaryListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/HighlightCorrectSummary';
    this.requestedURLs.backURL='admin/'+"highlight-correct-summary";
    this.requestedURLs.title='Highlight Correct Summary';
  }

}
