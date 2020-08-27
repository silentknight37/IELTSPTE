import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-reading-multiple-choice-setup',
  templateUrl: './reading-multiple-choice-setup.component.html',
  styleUrls: ['./reading-multiple-choice-setup.component.scss']
})
export class ReadingMultipleChoiceSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReadingMultipleChoice';
    this.requestedURLs.backURL='admin/'+"reading-multiple-choice";
    this.requestedURLs.title='Multiple Choice';
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.istts=false;
    this.requestedURLs.placeHolder="Question Text [[correct answer 1,correct answer 2],other answer 1,other answer 2]";
  }

}
