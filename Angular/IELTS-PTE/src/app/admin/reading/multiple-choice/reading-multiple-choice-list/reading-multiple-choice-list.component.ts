import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-reading-multiple-choice-list',
  templateUrl: './reading-multiple-choice-list.component.html',
  styleUrls: ['./reading-multiple-choice-list.component.scss']
})
export class ReadingMultipleChoiceListComponent implements OnInit {

  requestedURLs=new ApiURL();
  
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReadingMultipleChoice';
    this.requestedURLs.backURL='admin/'+"reading-multiple-choice";
    this.requestedURLs.title='Multiple Choice';
  }

}
