import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-repeat-sentence-setup',
  templateUrl: './repeat-sentence-setup.component.html',
  styleUrls: ['./repeat-sentence-setup.component.scss']
})
export class RepeatSentenceSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/RepeatSentence';
    this.requestedURLs.backURL='admin/'+"repeat-sentence";
    this.requestedURLs.title='Repeat Sentence';
    this.requestedURLs.istts=true;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text";
  }

}
