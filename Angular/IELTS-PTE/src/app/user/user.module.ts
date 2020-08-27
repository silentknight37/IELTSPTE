import { NgModule } from '@angular/core'
import { CommonModule } from  '@angular/common';
import {UserService} from './user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserAlertComponent } from './alert/user-alert.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[],
  declarations: [UserAlertComponent],
  providers: [UserService]
})
export class UserModule { }
