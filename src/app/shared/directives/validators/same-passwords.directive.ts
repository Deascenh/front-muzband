import { Directive } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
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
  validate(group: FormGroup): {[key: string]: any} | null {
    return samePasswords(group);
  }
}

export class SamePasswordsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && !control.touched && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
