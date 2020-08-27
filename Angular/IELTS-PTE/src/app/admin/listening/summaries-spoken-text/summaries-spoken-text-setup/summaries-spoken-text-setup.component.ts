import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-summaries-spoken-text-setup',
  templateUrl: './summaries-spoken-text-setup.component.html',
  styleUrls: ['./summaries-spoken-text-setup.component.scss']
})
export class SummariesSpokenTextSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/SummariesSpokenText';
    this.requestedURLs.backURL='admin/'+"summaries-spoken-text";
    this.requestedURLs.title='Summaries Spoken Text';
    this.requestedURLs.istts=false;
    this.requestedURLs.isSummarySetup=true;
    this.requestedURLs.placeHolder="question text";
  }

}
