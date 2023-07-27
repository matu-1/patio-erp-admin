import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { DateUtils } from 'src/app/utils/date.util';
import { CustomValidators } from 'src/app/utils/validators';

export const createInvoiceSchema: TextFieldSchema = [
  {
    name: 'merchant',
    label: 'Merchant',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        message: 'Minimum 3 characters',
        name: 'minlength',
        validatorFn: Validators.minLength(3),
      },
    ],
    xs: '100%',
    df: '40%',
  },
  {
    name: 'quantity',
    label: 'Quantity',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'int',
        message: 'Must be a integer',
        validatorFn: CustomValidators.int,
      },
      {
        name: 'min',
        message: 'Minimum 1',
        validatorFn: Validators.min(1),
      },
    ],
    xs: '100%',
    df: '20%',
  },
  {
    name: 'fee',
    label: 'Fee',
    value: 0,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'number',
        message: 'Must be a number',
        validatorFn: CustomValidators.number,
      },
      {
        name: 'min',
        message: 'Minimum 0',
        validatorFn: Validators.min(0),
      },
    ],
    xs: '100%',
    df: '20%',
  },
  {
    name: 'amount',
    label: 'Amount',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'number',
        message: 'Must be a number',
        validatorFn: CustomValidators.number,
      },
      {
        name: 'min',
        message: 'Minimum 1',
        validatorFn: Validators.min(1),
      },
    ],
    xs: '100%',
    df: '20%',
  },
  {
    name: 'description',
    label: 'Description',
    fieldType: TextFieldType.Textarea,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        message: 'Minimum 5 characters',
        name: 'minlength',
        validatorFn: Validators.minLength(5),
      },
    ],
    xs: '100%',
    df: '100%',
  },
  {
    name: 'tips',
    label: 'Tips',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'number',
        message: 'Must be a number',
        validatorFn: CustomValidators.number,
      },
      {
        name: 'min',
        message: 'Minimum 1',
        validatorFn: Validators.min(1),
      },
    ],
    xs: '100%',
    df: '30%',
  },
  {
    name: 'startDate',
    label: 'Start Date',
    value: new Date(),
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    xs: '100%',
    df: '35%',
  },
  {
    name: 'endDate',
    label: 'End Date',
    value: new Date(),
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    xs: '100%',
    df: '35%',
  },
  {
    name: 'backup',
    label: 'backup File',
    fieldType: TextFieldType.File,
    fileAccept:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    xs: '100%',
    df: '50%',
  },
  {
    name: 'total',
    label: 'Total',
    readOnly: true,
    xs: '100%',
    df: '20%',
  },
];

export const createDiscountSchema: TextFieldSchema = [
  {
    name: 'description',
    label: 'Description',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        message: 'Minimum 5 characters',
        name: 'minlength',
        validatorFn: Validators.minLength(5),
      },
    ],
    xs: '50%',
    df: '50%',
  },
  {
    name: 'amount',
    label: 'Amount',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'number',
        message: 'Must be a number',
        validatorFn: CustomValidators.number,
      },
      {
        name: 'min',
        message: 'Minimum 1',
        validatorFn: Validators.min(1),
      },
    ],
    xs: '30%',
    df: '30%',
  },
];

export const invoiceFilterSchema: TextFieldSchema = [
  {
    name: 'start',
    label: 'Fecha Inicial',
    value: DateUtils.getMinHour(),
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    sm: '25%',
    df: '14%',
  },
  {
    name: 'end',
    label: 'Fecha Final',
    value: DateUtils.getMaxHour(),
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    sm: '25%',
    df: '14%',
  }
];
