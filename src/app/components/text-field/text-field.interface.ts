import { FormGroup, ValidatorFn } from '@angular/forms';

export enum TextFieldType {
  TextField,
  Dropdown,
  Autocomplete,
  Radio,
  DatePicker,
}

export interface Option {
  value: string | number;
  label: string;
}

type Type =
  | 'text'
  | 'password'
  | 'time'
  | 'date'
  | 'email'
  | 'number'
  | 'datetime-local';

interface Validator {
  name: string;
  validatorFn: ValidatorFn;
  message: string;
}

export interface TextFieldValue {
  name: string;
  value?: string | number | Date;
  label: string;
  inputType?: TextFieldType;
  type?: Type;
  validators?: Validator[];
  options?: Option[] | any[]; //select | autocomplete
  getOptionLabel?: (value: any) => string; //autocomplete
  minRows?: number;
  maxRows?: number;
  fullWidth?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
}

export type TextFieldSchema = TextFieldValue[];

export type TextFieldProps = {
  form: FormGroup;
  textFieldValue: TextFieldValue;
  mb?: number;
};
