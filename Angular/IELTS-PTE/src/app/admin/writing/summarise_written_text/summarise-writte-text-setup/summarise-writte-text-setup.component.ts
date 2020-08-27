import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-summarise-writte-text-setup',
  templateUrl: './summarise-writte-text-setup.component.html',
  styleUrls: ['./summarise-writte-text-setup.component.scss']
})
export class SummariseWritteTextSetupComponent implements OnInit {

  
  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/WritingSummariseWrittenText';
    this.requestedURLs.backURL='admin/'+"summarise-writte-text";
    this.requestedURLs.title='Summarise writte text';
    this.requestedURLs.istts=false;
    this.requestedURLs.isSummarySetup=true;
    this.requestedURLs.placeHolder="question text";
  }

}
