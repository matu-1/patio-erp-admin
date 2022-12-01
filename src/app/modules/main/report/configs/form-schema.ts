import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { months } from 'src/app/constants/months.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { generateYears } from 'src/app/utils/utils';

export const paymentDetailSchema: TextFieldSchema = [
  {
    name: 'month',
    label: 'Mes',
    value: new Date().getMonth() + 1,
    fieldType: TextFieldType.Dropdown,
    options: months.map((month, i) => ({ value: i + 1, label: month })),
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
  },
  {
    name: 'management',
    label: 'Gestión',
    value: new Date().getFullYear(),
    fieldType: TextFieldType.Dropdown,
    options: generateYears(2020).map((year) => ({ value: year, label: year })),
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
  },
];

export const deliveryDetailSchema: TextFieldSchema = [
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
    df: '20%',
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
    df: '20%',
  },
  {
    name: 'showDetails',
    label: 'Ver Detalle',
    fieldType: TextFieldType.Dropdown,
    value: 0,
    options: [
      {
        value: 0,
        label: 'No',
      },
      {
        value: 1,
        label: 'Si',
      },
    ],
    df: '15%',
  },
];

export const hoursWorkedFilterSchema: TextFieldSchema = [
  {
    name: 'start',
    label: 'Fecha Inicial',
    fieldType: TextFieldType.DatePicker,
    value: DateUtils.getMaxHour(),
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '20%',
  },
  {
    name: 'end',
    label: 'Fecha Final',
    fieldType: TextFieldType.DatePicker,
    value: DateUtils.getMaxHour(),
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '20%',
  },
  {
    name: 'cityId',
    label: 'Ciudad',
    fieldType: TextFieldType.Dropdown,
    df: '30%',
  },
];

export const ordersReceivedFilterSchema: TextFieldSchema = [
  ...hoursWorkedFilterSchema.slice(0, 2),
  {
    name: 'paymentModeId',
    label: 'Método Pago',
    value: 1,
    fieldType: TextFieldType.Dropdown,
    options: [
      { label: 'All', value: undefined },
      { label: 'Cash', value: 1 },
      { label: 'Online', value: 2 },
    ],
    df: '15%',
  },
];

export const ordersFilterSchema: TextFieldSchema = [
  {
    name: 'startDate',
    label: 'Fecha Inicial',
    fieldType: TextFieldType.DatePicker,
    value: DateUtils.getMinHour(),
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '12%',
    sm: '25%',
  },
  {
    name: 'endDate',
    label: 'Fecha Final',
    fieldType: TextFieldType.DatePicker,
    value: DateUtils.getMaxHour(),
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '12%',
    sm: '25%',
  },
  {
    name: 'cityId',
    label: 'Ciudad',
    fieldType: TextFieldType.Dropdown,
    df: '15%',
    sm: '30%',
  },
  {
    name: 'merchantId',
    label: 'Comercio',
    fieldType: TextFieldType.Dropdown,
    df: '17%',
    sm: '30%',
  },
];
