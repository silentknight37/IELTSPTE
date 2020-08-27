import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-fill-in-blanks-setup',
  templateUrl: './fill-in-blanks-setup.component.html',
  styleUrls: ['./fill-in-blanks-setup.component.scss']
})
export class FillInBlanksSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/FillInBlanks';
    this.requestedURLs.backURL='admin/'+"fill-in-blanks";
    this.requestedURLs.title='Fill In Blanks';
    this.requestedURLs.istts=true;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text [answer 1] question text [answer 2]";
  }

}
