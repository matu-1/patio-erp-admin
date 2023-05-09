import {
  Component,
  DoCheck,
  Input,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { TextFieldValue, TextFieldType } from './text-field.interface';

@Component({
  selector: 'app-text-field[form][textFieldValue]',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit, DoCheck {
  @Input()
  form!: FormGroup;
  @Input()
  textFieldValue!: TextFieldValue;
  @Input()
  class?: string;
  TextFieldType = TextFieldType;
  filteredOptions?: Observable<any[]>; //filter autocomplete
  value = this.textFieldValue?.value;
  private textFieldValueDiffer!: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers) {}

  ngOnInit(): void {
    this.textFieldValueDiffer = this.differs.find(this.textFieldValue).create();
  }

  ngDoCheck(): void {
    const changes = this.textFieldValueDiffer.diff(this.textFieldValue);
    if (changes) {
      this.textFieldValueChanges(changes);
    }
  }

  textFieldValueChanges(_: KeyValueChanges<string, any>) {
    if (this.textFieldValue.options && !this.filteredOptions)
      this.changeValueAutocomplete();
  }

  get control() {
    return this.form.get(this.textFieldValue.name);
  }

  getOptionLabel(option: any) {
    return this.textFieldValue.getOptionLabel
      ? this.textFieldValue.getOptionLabel(option) ?? ''
      : '';
  }

  private changeValueAutocomplete() {
    this.filteredOptions = this.control?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        // console.log('changeValue:value', value);
        const parsedValue =
          typeof value == 'string' ? value : this.getOptionLabel(value);
        return this.filter(parsedValue);
      })
    );
  }

  private filter(value: any) {
    // console.log('filter:value', value);
    if (!this.textFieldValue.options) return [];
    return this.textFieldValue.options!.filter((option) => {
      return this.getOptionLabel(option)
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.value = event.option.value;
  }

  onClosed() {
    if (typeof this.control?.value == 'string')
      this.control.setValue(this.value);
  }

  clearAutocomplete() {
    this.control?.setValue('');
    this.value = '';
  }
}
