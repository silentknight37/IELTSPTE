import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-listening-multiple-choice-setup',
  templateUrl: './listening-multiple-choice-setup.component.html',
  styleUrls: ['./listening-multiple-choice-setup.component.scss']
})
export class ListeningMultipleChoiceSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ListeningMultipleChoice';
    this.requestedURLs.backURL='admin/'+"listening-multiple-choice";
    this.requestedURLs.title='Multiple Choice';
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.istts=false;
    this.requestedURLs.placeHolder="Question Text [[correct answer 1,correct answer 2],other answer 1,other answer 2]";
  }

}
