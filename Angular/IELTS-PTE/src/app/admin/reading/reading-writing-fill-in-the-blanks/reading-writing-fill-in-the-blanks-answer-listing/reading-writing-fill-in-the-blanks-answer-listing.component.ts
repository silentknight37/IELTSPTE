import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';
@Component({
  selector: 'app-reading-writing-fill-in-the-blanks-answer-listing',
  templateUrl: './reading-writing-fill-in-the-blanks-answer-listing.component.html',
  styleUrls: ['./reading-writing-fill-in-the-blanks-answer-listing.component.scss']
})
export class ReadingWritingFillInTheBlanksAnswerListingComponent implements OnInit {

  requestedURLs=new ApiURL();

  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReadingWritingFillInTheBlanks';
    this.requestedURLs.backURL='admin/'+"reading-writing-fill-in-blanks";
    this.requestedURLs.title='Reading Writing Fill In The Blanks';
  }

}
