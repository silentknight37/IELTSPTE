import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-re-order-paragaph-list',
  templateUrl: './re-order-paragaph-list.component.html',
  styleUrls: ['./re-order-paragaph-list.component.scss']
})
export class ReOrderParagaphListComponent implements OnInit {

  requestedURLs=new ApiURL();
  
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReOrderParagraph';
    this.requestedURLs.backURL='admin/'+"re-order-paragraph";
    this.requestedURLs.title='Reorder Paragraph';
  }


}
