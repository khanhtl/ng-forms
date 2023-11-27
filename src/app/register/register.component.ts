import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  passwordMatchValidator,
  validateUserNameFromApi,
} from '../custom-validator';
import { Subject, filter, startWith, switchMap, take, tap } from 'rxjs';

const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private readonly _fb = inject(FormBuilder);
  submitSubject$ = new Subject<void>();
  ngOnInit() {
    this.submitSubject$
      .pipe(
        tap(() => this.registerForm.markAsDirty()),
        switchMap(() =>
          this.registerForm.statusChanges.pipe(
            startWith(this.registerForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => this.onSubmit())
      )
      .subscribe();
  }

  registerForm = this._fb.group({
    username: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-z]{6,32}$/i),
      ]),
      validateUserNameFromApi(),
    ],
    passwords: this._fb.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(PASSWORD_PATTERN),
          ]),
        ],
        confirmPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(PASSWORD_PATTERN),
          ]),
        ],
      },
      { validator: passwordMatchValidator('password', 'confirmPassword') }
    ),
  });
  onSubmit(): void {
    console.log(this.registerForm);
  }
}
