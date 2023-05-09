import { AbstractControl, ValidationErrors } from '@angular/forms';

export abstract class CustomValidators {
  static int(control: AbstractControl): ValidationErrors | null {
    const pattern = /^\d*$/;
    if (!control.value || pattern.test(control.value)) return null;
    return { int: true };
  }

  static number(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !isNaN(control.value)) return null;
    return { number: true };
  }
}
