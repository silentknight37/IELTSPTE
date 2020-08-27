import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-fill-in-blanks-list',
  templateUrl: './fill-in-blanks-list.component.html',
  styleUrls: ['./fill-in-blanks-list.component.scss']
})
export class FillInBlanksListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/FillInBlanks';
    this.requestedURLs.backURL='admin/'+"fill-in-blanks";
    this.requestedURLs.title='Fill In Blanks';
  }

}
