import { Component, OnInit } from '@angular/core';
import { UserRegisterModel } from '../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  register = new UserRegisterModel();
  registerForm: FormGroup;
  token:any;

  constructor(private fb: FormBuilder,private userService:UserService,private _router:Router) { }


  ngOnInit() {
   
  }

    newUser:UserRegisterModel={
      userId:null,
      firstName:null,
      lastName:null,
      mobile:null,
      email:null,
      password:null,
      confirmpassword:null,
      isConfirmTerms:false,
    };

  saveUser():void{
    debugger;    
    this.userService.createwithAction(this.newUser,'api/User/Register').subscribe(res=>{
      this.token = res;
      this._router.navigate(['register-success'])
    },
    error =>{}) 
  }
 
}
