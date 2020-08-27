import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.scss']
})
export class UserAlertComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }
  RedirectToLogin():void{
    this._router.navigate([''])
  }
}
