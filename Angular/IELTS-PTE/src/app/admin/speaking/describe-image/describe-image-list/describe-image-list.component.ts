import { Component, OnInit } from '@angular/core';
import { ApiURL } from 'src/app/shared/common-question';

@Component({
  selector: 'app-describe-image-list',
  templateUrl: './describe-image-list.component.html',
  styleUrls: ['./describe-image-list.component.scss']
})
export class DescribeImageListComponent implements OnInit {

  requestedURLs=new ApiURL();
  constructor() { }

  ngOnInit() {
    this.requestedURLs.apiURL='api/DescribeImage';
    this.requestedURLs.backURL='admin/'+"describe-image";
    this.requestedURLs.title='Describe Image';
  }

}
