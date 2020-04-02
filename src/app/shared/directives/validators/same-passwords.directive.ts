import { Directive } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {isUser} from './is-user.directive';
import {ErrorStateMatcher} from '@angular/material/core';

export function samePasswords(group: FormGroup) {
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPassword').value;

  return pass === confirmPass ? null : { notSame: true };
}

@Directive({
  selector: '[appSamePassword]'
})
export class SamePasswordsDirective {
  validate(control: AbstractControl): {[key: string]: any} | null {
    return isUser();
  }
}

export class SamePasswordsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
