import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextFieldValue, TextFieldType } from './text-field.interface';

@Component({
  selector: 'app-text-field[form][textFieldValue]',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit {
  @Input()
  form!: FormGroup;
  @Input()
  textFieldValue!: TextFieldValue;
  @Input()
  class?: string;
  TextFieldType = TextFieldType;

  constructor() {}

  ngOnInit(): void {}

  get control() {
    return this.form.get(this.textFieldValue.name);
  }
}
