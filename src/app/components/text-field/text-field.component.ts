import {
  Component,
  DoCheck,
  Input,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { debounceTime, map, Observable, startWith } from 'rxjs';
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
  searchControl = new FormControl();
  selectionMultipleValues: Record<number, boolean> = {}

  constructor(private differs: KeyValueDiffers) {}

  ngOnInit(): void {
    this.textFieldValueDiffer = this.differs.find(this.textFieldValue).create();
    if (this.textFieldValue.fieldType == TextFieldType.File)
      this.form.addControl(
        `${this.textFieldValue.name}File`,
        new FormControl()
      );
  }

  ngDoCheck(): void {
    const changes = this.textFieldValueDiffer.diff(this.textFieldValue);
    if (changes) {
      this.textFieldValueChanges(changes);
    }
  }

  textFieldValueChanges(_: KeyValueChanges<string, any>) {
    if (this.textFieldValue.options && !this.filteredOptions)
      this.changeValueAutocomplete(
        this.textFieldValue.fieldType == TextFieldType.DropdownMultiSearch
          ? this.searchControl
          : this.control
      );
  }

  get control() {
    return this.form.get(this.textFieldValue.name);
  }

  getOptionLabel(option: any) {
    return this.textFieldValue.getOptionLabel
      ? this.textFieldValue.getOptionLabel(option) ?? ''
      : '';
  }

  private changeValueAutocomplete(control: AbstractControl | null) {
    this.filteredOptions = control?.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      map((value) => {
        console.log('changeValue:value', value);
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

  clearAutocomplete(control = this.control) {
    control?.setValue('');
    this.value = '';
  }

  handleFileInputChange(files: FileList | null): void {
    if (!files) return;
    if (files.length) {
      const count = files.length > 1 ? `(+${files.length - 1} files)` : '';
      this.control?.setValue(`${files[0].name}${count}`);
      this.form.get(`${this.textFieldValue.name}File`)?.setValue(files);
    } else {
      this.control?.setValue('');
    }
  }

  changeOption(event: MatOptionSelectionChange) {
    console.log("selection multiple value:", this.control?.value);
    console.log('event', event.source.value, event.source.selected);
  }
}
