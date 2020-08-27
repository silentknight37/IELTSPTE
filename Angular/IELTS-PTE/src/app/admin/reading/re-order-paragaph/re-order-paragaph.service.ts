import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/baseService';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReOrderParagaphService extends BaseService {

  constructor(http: HttpClient,appConfigService:AppConfigService) { 
    super(http, appConfigService.getBaseUrl());
  }
}
