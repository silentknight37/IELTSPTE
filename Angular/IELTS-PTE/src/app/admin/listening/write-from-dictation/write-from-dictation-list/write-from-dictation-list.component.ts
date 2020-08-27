import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-write-from-dictation-list',
  templateUrl: './write-from-dictation-list.component.html',
  styleUrls: ['./write-from-dictation-list.component.scss']
})
export class WriteFromDictationListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/WriteFromDictation';
    this.requestedURLs.backURL='admin/'+"write-from-dictation";
    this.requestedURLs.title='Write from Dictation';
  }

}
