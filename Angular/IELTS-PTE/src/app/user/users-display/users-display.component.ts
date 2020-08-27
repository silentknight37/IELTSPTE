import { Component, OnInit } from '@angular/core';
import { UserRegisterModel } from '../user';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.scss']
})
export class UsersDisplayComponent implements OnInit {

  users=new UserRegisterModel();

  constructor() { }

  ngOnInit() {
    
  }

}
