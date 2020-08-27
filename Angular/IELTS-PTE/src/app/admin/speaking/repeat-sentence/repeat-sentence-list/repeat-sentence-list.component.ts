import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-repeat-sentence-list',
  templateUrl: './repeat-sentence-list.component.html',
  styleUrls: ['./repeat-sentence-list.component.scss']
})
export class RepeatSentenceListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/RepeatSentence';
    this.requestedURLs.backURL='admin/'+"repeat-sentence";
    this.requestedURLs.title='Repeat Sentence';
  }

}
