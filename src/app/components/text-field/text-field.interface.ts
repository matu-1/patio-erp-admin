import { ValidatorFn } from '@angular/forms';

export enum TextFieldType {
  TextField,
  Dropdown,
  Textarea,
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
  fieldType?: TextFieldType;
  type?: Type;
  validators?: Validator[];
  multiple?: boolean; //select
  options?: Option[] | any[]; //select | autocomplete
  getOptionLabel?: (value: any) => string; //autocomplete
  minRows?: number;
  maxRows?: number;
  fullWidth?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  df?: number | string;
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
}

export type TextFieldSchema = TextFieldValue[];
