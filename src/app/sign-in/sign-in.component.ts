import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  usernamePattern=/^[a-z]{6,32}$/i;
  passwordPattern = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
  userInfo={
    username: 'tlkhanh',
    password: '',
    rememberMe: false
  }
  onSubmit(form: NgForm): void {
    console.log(form);
  }
}
