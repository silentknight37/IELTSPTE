import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-listening-single-choice-list',
  templateUrl: './listening-single-choice-list.component.html',
  styleUrls: ['./listening-single-choice-list.component.scss']
})
export class ListeningSingleChoiceListComponent implements OnInit {

  requestedURLs=new ApiURL();
  
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ListeningSingleChoice';
    this.requestedURLs.backURL='admin/'+"listening-single-choice";
    this.requestedURLs.title='Single Choice';
  }
}
