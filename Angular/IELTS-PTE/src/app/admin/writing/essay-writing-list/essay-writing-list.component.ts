import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-essay-writing-list',
  templateUrl: './essay-writing-list.component.html',
  styleUrls: ['./essay-writing-list.component.scss']
})
export class EssayWritingListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/WritingEssay';
    this.requestedURLs.backURL='admin/'+"essay-writing";
    this.requestedURLs.title='Essay Writing';
  }
}
