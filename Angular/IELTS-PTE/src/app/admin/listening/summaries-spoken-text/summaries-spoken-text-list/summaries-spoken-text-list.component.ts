import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-summaries-spoken-text-list',
  templateUrl: './summaries-spoken-text-list.component.html',
  styleUrls: ['./summaries-spoken-text-list.component.scss']
})
export class SummariesSpokenTextListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/SummariesSpokenText';
    this.requestedURLs.backURL='admin/'+"summaries-spoken-text";
    this.requestedURLs.title='Select Missing Word';
  }

}
