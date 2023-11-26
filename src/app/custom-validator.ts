import { AbstractControl, ValidatorFn } from '@angular/forms';

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
      return isValid ? null : { minlength: {
        requiredLength: minLength,
        actualLength: valueLength
      } };
    };
  }