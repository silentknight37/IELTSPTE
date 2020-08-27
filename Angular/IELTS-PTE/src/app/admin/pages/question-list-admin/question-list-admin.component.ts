import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-question-list-admin',
  templateUrl: './question-list-admin.component.html',
  styleUrls: ['./question-list-admin.component.scss']
})
export class QuestionListAdminComponent implements OnInit {
  appConfig:AppConfigService;

  constructor(appConfigService:AppConfigService) { 
    this.appConfig=appConfigService;
  }

  ngOnInit() {
  }
  pageRedirct(page:string){
    window.location.href='admin/'+page;
  }
}
