import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[markAllSubmit][formGroup]',
})
export class MarkAllSubmitDirective {
  @Output()
  validSubmit = new EventEmitter();
  @Output()
  invalidSubmit = new EventEmitter();

  constructor(private formGroupDirective: FormGroupDirective) {}

  @HostListener('submit', ['$event'])
  onSubmit(e: any) {
    if (this.formGroupDirective.form.invalid) {
      this.formGroupDirective.form.markAllAsTouched();
      this.invalidSubmit.emit(e);
    } else this.validSubmit.emit(e);
  }
}
