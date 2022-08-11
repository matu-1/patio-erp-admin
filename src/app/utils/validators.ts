import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static int(control: AbstractControl): ValidationErrors | null {
    const pattern = /^\d*$/;
    if (!control.value || pattern.test(control.value)) return null;
    return { int: true };
  }
}
