import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-select-missing-word-list',
  templateUrl: './select-missing-word-list.component.html',
  styleUrls: ['./select-missing-word-list.component.scss']
})
export class SelectMissingWordListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/SelectMissingWord';
    this.requestedURLs.backURL='admin/'+"select-missing-word";
    this.requestedURLs.title='Select Missing Word';
  }

}
