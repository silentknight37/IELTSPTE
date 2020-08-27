import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-reading-single-choice-list',
  templateUrl: './reading-single-choice-list.component.html',
  styleUrls: ['./reading-single-choice-list.component.scss']
})
export class ReadingSingleChoiceListComponent implements OnInit {

  requestedURLs=new ApiURL();
  
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReadingSingleChoice';
    this.requestedURLs.backURL='admin/'+"reading-single-choice";
    this.requestedURLs.title='Single Choice';
  }

}
