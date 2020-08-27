import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-summarise-writte-text-list',
  templateUrl: './summarise-writte-text-list.component.html',
  styleUrls: ['./summarise-writte-text-list.component.scss']
})
export class SummariseWritteTextListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/WritingSummariseWrittenText';
    this.requestedURLs.backURL='admin/'+"summarise-writte-text";
    this.requestedURLs.title='Summarise writte text';
  }

}
