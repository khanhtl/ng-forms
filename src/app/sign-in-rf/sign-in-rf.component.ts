import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {CustomRequiredValidator, CustomMinLengthValidator} from '../custom-validator'
@Component({
  selector: 'app-sign-in-rf',
  templateUrl: './sign-in-rf.component.html',
  styleUrls: ['./sign-in-rf.component.scss'],
})
export class SignInRfComponent {
  private readonly _fb = inject(FormBuilder);
  signInForm = this._fb.group({
    username: [
      '',
      Validators.compose([
        CustomRequiredValidator(),
        CustomMinLengthValidator(6),
        Validators.pattern(/^[a-z]$/i),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
      ]),
    ],
    rememberMe: false,
  });

  onSubmit(): void {
    console.log(this.signInForm);
  }
}
