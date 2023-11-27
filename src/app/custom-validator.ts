import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, delay, map, of, switchMap, timer } from 'rxjs';

export function CustomRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let controlVal = control.value;
    if (typeof controlVal === 'number') {
      controlVal = `${controlVal}`;
    }
    let isWhitespace = (controlVal || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { required: 'value is required' };
  };
}

export function CustomMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let controlVal = control.value;
    if (typeof controlVal === 'number') {
      controlVal = `${controlVal}`;
    }
    let valueLength = (controlVal || '').trim().length;
    let isValid = valueLength >= minLength;
    return isValid
      ? null
      : {
          minlength: {
            requiredLength: minLength,
            actualLength: valueLength,
          },
        };
  };
}

export function passwordMatchValidator(
  firstControlName: string,
  secondControlName: string
) {
  return function (fg: FormGroup) {
    const firstValue = fg.get(firstControlName)?.value;
    const secondValue = fg.get(secondControlName)?.value;
    if (firstValue===secondValue) return null;
    fg.get(secondControlName)?.setErrors({
      valueNotMatch: {
        firstValue,
        secondValue,
      },
    })
    return {
      valueNotMatch: {
        firstValue,
        secondValue,
      },
    };
  };
}

export function validateUserNameFromApi() {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() => {
        return validateUsername(control.value).pipe(
          map((isValid: boolean) => {
            return isValid ? null : { usernameDuplicated: true };
          })
        );
      })
    );
  };
}

function validateUsername(username: string): Observable<boolean> {
  console.log('Trigger API call');
  let existedUsers = ['tlkhanh', 'pdxuan', 'nqdat'];
  let isValid = existedUsers.every((x) => x !== username);
  return of(isValid).pipe(delay(1000));
}
