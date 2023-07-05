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
    label: 'Banco',
    name: 'bankName',
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
    label: 'Nombre Completo',
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
    label: 'Nombre Completo',
    name: 'nameZelle',
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
    name: 'phoneZelle',
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

export const invoiceByYearSchema: TextFieldSchema = [
  {
    name: 'year',
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

export const driverInfoSchema: TextFieldSchema = [
  {
    name: 'id',
    label: 'Id',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'name',
    label: 'Nombre',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'email',
    label: 'Email',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'phone',
    label: 'Phone',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'status',
    label: 'Status',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'wallet',
    label: 'Wallet',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'rating',
    label: 'Rating',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'cityName',
    label: 'Ciudad',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'extra_amount',
    label: 'Ganancia extra',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'modalityName',
    label: 'Modalidad',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'jugno_id',
    label: 'Jugno Id',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'contract_url',
    label: 'Contrato url',
    readOnly: true,
    df: '60%',
    sm: '40%',
  },
  {
    name: 'last_login',
    label: 'Ultima sesión',
    fieldType: TextFieldType.DatePicker,
    readOnly: true,
    validators: [],
    df: '20%',
    sm: '25%',
  },
  {
    name: 'signature_url',
    label: 'Firma url',
    readOnly: true,
    df: '60%',
    sm: '40%',
  },
  {
    name: 'identity_number',
    label: 'Numero de identidad',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'last_coordinate',
    label: 'Ultima coordenada',
    readOnly: true,
    df: '20%',
    sm: '30%',
  },
  {
    name: 'createdAt',
    label: 'Creado el',
    fieldType: TextFieldType.DatePicker,
    readOnly: true,
    validators: [],
    df: '20%',
    sm: '25%',
  },
];

export const editBankAccountInfoSchema: TextFieldSchema = [
  {
    label: 'Número de Cuenta',
    name: 'accountNumber',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Tipo de Cuenta',
    name: 'accountType',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Banco',
    name: 'bankName',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Routing Number',
    name: 'routingNumber',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Celular',
    name: 'phone',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Nombre Completo',
    name: 'name',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Dirección',
    name: 'address',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Social Security',
    name: 'socialSecurity',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Método Pago',
    name: 'paymentMethod',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Verificado',
    name: 'verified',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Nombre Completo (Zelle)',
    name: 'nameZelle',
    readOnly: true,
    df: '20%',
  },
  {
    label: 'Celular o Correo (Zelle)',
    name: 'phoneZelle',
    readOnly: true,
    df: '20%',
  },
];
