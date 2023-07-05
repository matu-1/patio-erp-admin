import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextFieldSchema } from '../text-field/text-field.interface';

@Component({
  selector: 'app-form-builder[schema][form]',
  templateUrl: './form-builder.component.html',
})
export class FormBuilderComponent {
  @Input() schema!: TextFieldSchema;
  @Input() form!: FormGroup;
  @Output() frmSubmit = new EventEmitter();
  @Input() showBtnIcon = true;
  @Input() showBtn = true;

  constructor() {}

  onSubmit() {
    this.frmSubmit.emit();
  }
}
