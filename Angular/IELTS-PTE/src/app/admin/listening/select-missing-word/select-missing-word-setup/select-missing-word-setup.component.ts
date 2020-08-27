import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-select-missing-word-setup',
  templateUrl: './select-missing-word-setup.component.html',
  styleUrls: ['./select-missing-word-setup.component.scss']
})
export class SelectMissingWordSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/SelectMissingWord';
    this.requestedURLs.backURL='admin/'+"select-missing-word";
    this.requestedURLs.title='Select Missing Word';
    this.requestedURLs.istts=false;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text [[correct-answer],[other-answer1],[other-answer2],[other-answer3]]";
  }

}
