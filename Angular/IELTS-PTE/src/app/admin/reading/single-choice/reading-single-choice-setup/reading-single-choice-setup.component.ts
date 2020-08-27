import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-reading-single-choice-setup',
  templateUrl: './reading-single-choice-setup.component.html',
  styleUrls: ['./reading-single-choice-setup.component.scss']
})
export class ReadingSingleChoiceSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReadingSingleChoice';
    this.requestedURLs.backURL='admin/'+"reading-single-choice";
    this.requestedURLs.title='Single Choice';
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.istts=false;
    this.requestedURLs.placeHolder="Question Text [[correct answer 1],other answer 1,other answer 2]";
  }
}
