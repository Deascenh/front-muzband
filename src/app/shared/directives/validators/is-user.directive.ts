import {Directive} from '@angular/core';
import {AbstractControl, Validator, ValidatorFn} from '@angular/forms';
import {User} from '../../../core/models';

export function isUser(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;
    return value instanceof User || value === '' || value === null
      ? null
      : { isUser: {value: control.value} };
  };
}

@Directive({
  selector: '[appIsUser]'
})
export class IsUserDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} | null {
    return isUser();
  }
}
