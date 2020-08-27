import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-re-order-paragaph-setup',
  templateUrl: './re-order-paragaph-setup.component.html',
  styleUrls: ['./re-order-paragaph-setup.component.scss']
})
export class ReOrderParagaphSetupComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReOrderParagraph';
    this.requestedURLs.backURL='admin/'+"re-order-paragraph";
    this.requestedURLs.title='Reorder Paragraph';
    this.requestedURLs.isSummarySetup=false;
    this.requestedURLs.istts=false;
    this.requestedURLs.placeHolder="[answer text 1],[answer text 2],[answer text 3],[answer text 4]";
  }

}
