import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { CONFIG } from 'src/app/constants/config.constant';
import { months } from 'src/app/constants/months.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { generateYears } from 'src/app/utils/utils';
import { CustomValidators } from 'src/app/utils/validators';

export const paymentDetailSchema: TextFieldSchema = [
  {
    name: 'month',
    label: 'Mes',
    value: [new Date().getMonth() + 1],
    fieldType: TextFieldType.Dropdown,
    multiple: true,
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
    value: DateUtils.getMinHour(),
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
    value: CONFIG.CITY_EEUU,
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

export const editBankAccountSchema: TextFieldSchema = [
  {
    label: 'Número de Cuenta',
    name: 'accountNumber',
    validators: [
      {
        message: 'Is required',
        name: 'required',
        validatorFn: Validators.required,
      },
      {
        message: 'Is Number',
        name: 'int',
        validatorFn: CustomValidators.int,
      },
      {
        name: 'minlength',
        message: 'Minimum 3 characters',
        validatorFn: Validators.minLength(3),
      },
    ],
    df: '50%',
  },
  {
    label: 'Tipo de Cuenta',
    name: 'accountType',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '50%',
  },
  {
    label: 'Routing Number',
    name: 'routingNumber',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'int',
        message: 'Must be integer',
        validatorFn: CustomValidators.int,
      },
      {
        name: 'minlength',
        message: 'Minimum 3 characters',
        validatorFn: Validators.minLength(3),
      },
    ],
    df: '50%',
  },
  {
    label: 'Celular',
    name: 'phone',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'minlength',
        message: 'Minimum 8 characters',
        validatorFn: Validators.minLength(8),
      },
    ],
    df: '50%',
  },
  {
    label: 'Nombre completo',
    name: 'name',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'minlength',
        message: 'Minimum 3 characters',
        validatorFn: Validators.minLength(3),
      },
    ],
    df: '50%',
  },
  {
    label: 'Dirección',
    name: 'address',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'minlength',
        message: 'Minimum 5 characters',
        validatorFn: Validators.minLength(5),
      },
    ],
    df: '50%',
  },
  {
    label: 'Social Security',
    name: 'socialSecurity',
    validators: [
      {
        name: 'minlength',
        message: 'Minimum 3 characters',
        validatorFn: Validators.minLength(3),
      },
    ],
    df: '50%',
  },
  {
    label: 'Método Pago',
    name: 'paymentMethod',
    multiple: true,
    fieldType: TextFieldType.Dropdown,
    options: [
      { label: 'DIRECT DEPOSIT', value: 'DIRECT DEPOSIT' },
      { label: 'ZELLE', value: 'ZELLE' },
    ],
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '50%',
  },
  {
    label: 'Verificado',
    name: 'verified',
    value: 0,
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Si' },
    ],
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '50%',
  },
];

export const editBankAccountZelleSchema: TextFieldSchema = [
  {
    label: 'Nombre completo',
    name: 'name',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'minlength',
        message: 'Minimum 3 characters',
        validatorFn: Validators.minLength(3),
      },
    ],
    df: '50%',
  },
  {
    label: 'Celular o Correo',
    name: 'phone',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'minlength',
        message: 'Minimum 8 characters',
        validatorFn: Validators.minLength(8),
      },
    ],
    df: '50%',
  },
  {
    label: 'Verificado',
    name: 'verified',
    value: 0,
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Si' },
    ],
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '50%',
  },
];

export const collectMerchantSchema: TextFieldSchema = [
  ...hoursWorkedFilterSchema.slice(0, 2),
  {
    label: 'Merchants',
    name: 'merchants',
    fieldType: TextFieldType.Autocomplete,
    getOptionLabel: (value) => value?.label,
    df: '25%',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
  },
];
