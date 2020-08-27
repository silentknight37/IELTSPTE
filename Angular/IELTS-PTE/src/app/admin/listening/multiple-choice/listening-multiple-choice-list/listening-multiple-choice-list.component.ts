import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-listening-multiple-choice-list',
  templateUrl: './listening-multiple-choice-list.component.html',
  styleUrls: ['./listening-multiple-choice-list.component.scss']
})
export class ListeningMultipleChoiceListComponent implements OnInit {

  requestedURLs=new ApiURL();
  
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ListeningMultipleChoice';
    this.requestedURLs.backURL='admin/'+"listening-multiple-choice";
    this.requestedURLs.title='Multiple Choice';
  }

}
