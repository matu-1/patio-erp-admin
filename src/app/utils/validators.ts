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

  static url(control: AbstractControl): ValidationErrors | null {
    const pattern =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (!control.value || pattern.test(control.value)) return null;
    return { url: true };
  }
}
