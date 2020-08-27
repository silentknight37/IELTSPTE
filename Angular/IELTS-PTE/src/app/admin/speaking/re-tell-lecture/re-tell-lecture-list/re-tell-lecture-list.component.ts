import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-re-tell-lecture-list',
  templateUrl: './re-tell-lecture-list.component.html',
  styleUrls: ['./re-tell-lecture-list.component.scss']
})
export class ReTellLectureListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReTellLecture';
    this.requestedURLs.backURL='admin/'+"re-tell-lecture";
    this.requestedURLs.title='Re-Tell Lecture';
  }

}
