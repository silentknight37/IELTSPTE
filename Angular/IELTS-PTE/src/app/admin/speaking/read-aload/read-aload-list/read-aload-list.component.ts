import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-read-aload-list',
  templateUrl: './read-aload-list.component.html',
  styleUrls: ['./read-aload-list.component.scss']
})
export class ReadAloadListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/ReadAloud';
    this.requestedURLs.backURL='admin/'+"read-aloud";
    this.requestedURLs.title='Read Aloud';
  }

}
