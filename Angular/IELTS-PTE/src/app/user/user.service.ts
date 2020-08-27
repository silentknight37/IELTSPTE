import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../shared/services/baseService';
import { AppConfigService } from '../shared/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  actionName:string;


  constructor(http: HttpClient,appConfigService:AppConfigService) {
    super(http, appConfigService.getBaseUrl());
   }
}
