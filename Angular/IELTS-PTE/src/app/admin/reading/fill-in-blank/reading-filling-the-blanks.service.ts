import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/baseService';

@Injectable({
  providedIn: 'root'
})
export class ReadingFillingTheBlanksService extends BaseService {

  constructor(http: HttpClient,appConfigService:AppConfigService) { 
    super(http, appConfigService.getBaseUrl());
  }
}
