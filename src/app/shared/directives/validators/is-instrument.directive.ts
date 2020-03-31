import {Directive} from '@angular/core';
import {AbstractControl, Validator, ValidatorFn} from '@angular/forms';
import {Instrument} from '../../../core/models';

export function isInstrument(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;
    return value instanceof Instrument || value === '' || value === null
      ? null
      : { isInstrument: {value: control.value} };
  };
}

@Directive({
  selector: '[appIsInstrument]'
})
export class IsInstrumentDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} | null {
    return isInstrument();
  }
}
