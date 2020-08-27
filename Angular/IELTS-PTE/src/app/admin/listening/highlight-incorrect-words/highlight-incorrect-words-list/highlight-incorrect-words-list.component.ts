import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-highlight-incorrect-words-list',
  templateUrl: './highlight-incorrect-words-list.component.html',
  styleUrls: ['./highlight-incorrect-words-list.component.scss']
})
export class HighlightIncorrectWordsListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/HighlightIncorrectWords';
    this.requestedURLs.backURL='admin/'+"highlight-incorrect-words";
    this.requestedURLs.title='Highlight Incorrect Words';
  }

}
