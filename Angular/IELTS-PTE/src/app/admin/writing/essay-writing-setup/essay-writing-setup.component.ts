import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-essay-writing-setup',
  templateUrl: './essay-writing-setup.component.html',
  styleUrls: ['./essay-writing-setup.component.scss']
})
export class EssayWritingSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/WritingEssay';
    this.requestedURLs.backURL='admin/'+"essay-writing";
    this.requestedURLs.title='Essay Writing';
    this.requestedURLs.istts=false;
    this.requestedURLs.isSummarySetup=true;
    this.requestedURLs.placeHolder="question text";
  }

}
