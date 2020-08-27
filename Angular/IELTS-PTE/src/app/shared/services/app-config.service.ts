import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
url:any="https://localhost:5001/";
constructor() { }

getBaseUrl()
{
  return this.url;
}



}
