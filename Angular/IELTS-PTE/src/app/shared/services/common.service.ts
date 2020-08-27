import { Injectable } from '@angular/core';
import { BaseService } from './baseService';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends BaseService {

  constructor(http: HttpClient,appConfigService:AppConfigService) { 
    super(http, appConfigService.getBaseUrl());
  }
}
