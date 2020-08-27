import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { BaseService } from './baseService';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetupServiceService extends BaseService {

  constructor(http: HttpClient,appConfigService:AppConfigService) { 
    super(http, appConfigService.getBaseUrl());
  }
}
