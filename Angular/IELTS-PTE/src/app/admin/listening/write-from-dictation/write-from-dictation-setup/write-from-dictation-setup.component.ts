import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-write-from-dictation-setup',
  templateUrl: './write-from-dictation-setup.component.html',
  styleUrls: ['./write-from-dictation-setup.component.scss']
})
export class WriteFromDictationSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/WriteFromDictation';
    this.requestedURLs.backURL='admin/'+"write-from-dictation";
    this.requestedURLs.title='Write from Dictation';
    this.requestedURLs.istts=false;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text";
  }

}
