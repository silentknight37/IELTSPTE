import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-listening-single-choice-setup',
  templateUrl: './listening-single-choice-setup.component.html',
  styleUrls: ['./listening-single-choice-setup.component.scss']
})
export class ListeningSingleChoiceSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ListeningSingleChoice';
    this.requestedURLs.backURL='admin/'+"listening-single-choice";
    this.requestedURLs.title='Single Choice';
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.istts=false;
    this.requestedURLs.placeHolder="Question Text [[correct answer 1],other answer 1,other answer 2]";
  }

}
