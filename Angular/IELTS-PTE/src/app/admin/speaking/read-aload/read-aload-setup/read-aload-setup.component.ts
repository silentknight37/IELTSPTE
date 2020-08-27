import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-read-aload-setup',
  templateUrl: './read-aload-setup.component.html',
  styleUrls: ['./read-aload-setup.component.scss']
})
export class ReadAloadSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReadAloud';
    this.requestedURLs.backURL='admin/'+"read-aloud";
    this.requestedURLs.title='Read Aload';
    this.requestedURLs.istts=true;
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.placeHolder="question text";
  }

}
