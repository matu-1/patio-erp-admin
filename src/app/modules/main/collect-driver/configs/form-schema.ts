import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { DateUtils } from 'src/app/utils/date.util';
import { CustomValidators } from 'src/app/utils/validators';

export const paySchema: TextFieldSchema = [
  {
    name: 'amount',
    label: 'Monto',
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
    ],
  },
  {
    name: 'paymentMethod',
    label: 'Método Pago',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 0, label: 'Efectivo' },
      { value: 1, label: 'Wallet' },
      { value: 2, label: 'Cuenta Bancaria' },
      { value: 3, label: 'Soli' },
      { value: 4, label: 'Conciliación sin ingreso' },
    ],
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
  },
  {
    name: 'paidAt',
    label: 'Pagado el',
    value: new Date(),
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
  },
];

export const collectFilterSchema: TextFieldSchema = [
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
  },
  {
    name: 'isPayment',
    label: 'Es Pagado',
    fieldType: TextFieldType.Dropdown,
    options: [
      { label: 'All', value: undefined },
      { label: 'Si', value: 1 },
      { label: 'No', value: 0 },
    ],
    sm: '20%',
    df: '12%',
  },
];

export const createCollectDriverSchema: TextFieldSchema = [
  {
    name: 'driverId',
    label: 'Driver',
    fieldType: TextFieldType.Dropdown,
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
    name: 'amount',
    label: 'Monto',
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
        validatorFn: Validators.min(1),
      },
    ],
    xs: '100%',
    df: '50%',
  },
  {
    name: 'category',
    label: 'Categoría',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 1, label: 'Deuda' },
      { value: 2, label: 'Otro' },
    ],
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
    name: 'date',
    label: 'Fecha',
    value: new Date(),
    fieldType: TextFieldType.DatePicker,
    minRows: 3,
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
    name: 'reason',
    label: 'Razón',
    fieldType: TextFieldType.Textarea,
    minRows: 3,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'minlength',
        message: 'Minimum 3 characteres',
        validatorFn: Validators.minLength(3),
      },
    ],
    df: '100%',
  },
];
