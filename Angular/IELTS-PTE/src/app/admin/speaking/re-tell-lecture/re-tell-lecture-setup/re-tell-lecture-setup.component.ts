import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-re-tell-lecture-setup',
  templateUrl: './re-tell-lecture-setup.component.html',
  styleUrls: ['./re-tell-lecture-setup.component.scss']
})
export class ReTellLectureSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReTellLecture';
    this.requestedURLs.backURL='admin/'+"re-tell-lecture";
    this.requestedURLs.title='Re-Tell Lecture';
    this.requestedURLs.istts=true;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text";
  }

}
