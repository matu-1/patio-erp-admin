import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { months } from 'src/app/constants/months.constant';
import { generateYears, titleCase } from 'src/app/utils/utils';
import { CustomValidators } from 'src/app/utils/validators';

export const orderInvoiceFilterSchema: TextFieldSchema = [
  {
    name: 'id',
    label: 'Código',
    validators: [
      {
        name: 'int',
        validatorFn: CustomValidators.int,
        message: 'Must be integer',
      },
    ],
    df: '16.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'month',
    label: 'Meses',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: months.map((month, i) => ({
      value: i + 1,
      label: titleCase(month),
    })),
    df: '14.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'management',
    label: 'Gestión',
    fieldType: TextFieldType.Dropdown,
    options: generateYears().map((year) => ({
      label: year,
      value: year,
    })),
    df: '14.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'city',
    label: 'Ciudades',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    df: '18.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'status',
    label: 'Estados',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 0, label: 'No Recibida' },
      { value: 1, label: 'Recibida' },
    ],
    df: '18.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'paid',
    label: 'Moras',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 0, label: 'No Pagada' },
      { value: 1, label: 'Pagada' },
      { value: 2, label: 'Con pago parcial' },
      { value: 3, label: 'Conciliado' },
      { value: 4, label: 'Incobrable' },
    ],
    df: '16.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'collectorId',
    label: 'Cobrador',
    fieldType: TextFieldType.Dropdown,
    options: [{ value: 1, label: 'Ejecutivo test' }], //todo no hay datos
    df: '18.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'orderBy',
    label: 'Ordenar',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 'clientName', label: 'Nombre' },
      { value: 'reconciledAmount', label: 'Monto' },
    ],
    df: '14.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'collectionStatus',
    label: 'Programadas',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 'en fecha', label: 'Futuras' },
      { value: 'cobrar hoy', label: 'Hoy' },
      { value: 'cobro vencido', label: 'Vencidas' },
      { value: 'sin', label: 'Sin Programación' },
    ],
    df: '16.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'clientStatus',
    label: 'Clientes',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 'disabled', label: 'Bloqueado' },
      { value: 'enabled', label: 'Desbloqueado' },
    ],
    df: '16.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'search',
    label: 'Buscar',
    df: '23%',
    xs: '100%',
    sm: '23%',
  },
];

export const revertPaymentSchema: TextFieldSchema = [
  {
    label: 'Glosa',
    name: 'gloss',
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
  },
];

export const paySchema: TextFieldSchema = [
  {
    name: 'cashId',
    label: 'Caja',
    fieldType: TextFieldType.Dropdown,
    df: '50%',
    xs: '100%',
  },
  {
    name: 'accountingAccountId',
    label: 'Banco',
    fieldType: TextFieldType.Dropdown,
    df: '50%',
    xs: '100%',
  },
  {
    name: 'amount',
    label: 'Ingreso',
    validators: [
      {
        name: 'required',
        validatorFn: Validators.required,
        message: 'Is required',
      },
      {
        name: 'number',
        validatorFn: CustomValidators.number,
        message: 'must be number',
      },
    ],
    df: '50%',
    xs: '100%',
  },
  {
    name: 'paidAt',
    label: 'Fecha',
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        validatorFn: Validators.required,
        message: 'Is required',
      },
    ],
    df: '50%',
    xs: '100%',
  },
  {
    name: 'reason',
    label: 'Glosa',
    fieldType: TextFieldType.Textarea,
    minRows: 3,
    maxRows: 6,
    validators: [
      {
        name: 'required',
        validatorFn: Validators.required,
        message: 'Is required',
      },
      {
        name: 'minlength',
        validatorFn: Validators.minLength(2),
        message: 'Minimum 2 characters',
      },
    ],
    df: '100%',
    xs: '100%',
  },
];

export const schedulePaymentSchema: TextFieldSchema = [
  {
    name: 'collectionDate',
    label: 'Fecha Cobro',
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        validatorFn: Validators.required,
        message: 'Is required',
      },
    ],
  },
];

export const editSchema: TextFieldSchema = [
  {
    label: 'Cliente',
    name: 'clientName',
    disabled: true,
    xs: '100%',
    sm: '50%',
    df: '60%',
  },
  {
    label: 'Fecha Emisión',
    name: 'issueDate', //issue_date
    disabled: true,
    xs: '100%',
    sm: '50%',
    df: '40%',
  },
  {
    label: 'Nro. Factura',
    name: 'invoiceNumber',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
    validators: [
      {
        name: 'number',
        message: 'must be number',
        validatorFn: CustomValidators.int,
      },
    ],
  },
  {
    label: 'Nit',
    name: 'nit',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
  {
    label: 'Razón Social',
    name: 'businessName',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
  {
    label: 'Monto Conciliado',
    name: 'reconciledAmount',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'number',
        message: 'must be number',
        validatorFn: CustomValidators.number,
      },
    ],
    xs: '100%',
    sm: '50%',
    df: '25%',
  },
  {
    label: 'Monto',
    name: 'amount',
    disabled: true,
    xs: '100%',
    sm: '50%',
    df: '25%',
  },
  {
    label: 'Mes',
    name: 'month',
    disabled: true,
    xs: '100%',
    sm: '50%',
    df: '25%',
  },
  {
    label: 'Gestion',
    name: 'management',
    disabled: true,
    xs: '100%',
    sm: '50%',
    df: '25%',
  },
  {
    label: 'Comentario',
    name: 'comments',
    fieldType: TextFieldType.Textarea,
    validators: [
      {
        name: 'minlength',
        message: 'Mínimo 3 caracteres',
        validatorFn: Validators.minLength(3),
      },
    ],
    minRows: 3,
    maxRows: 5,
    xs: '100%',
    sm: '50%',
    df: '100%',
  },
  {
    label: 'Monto Incobrable',
    name: 'uncollectibleAmount',
    validators: [
      {
        name: 'number',
        message: 'must be number',
        validatorFn: CustomValidators.number,
      },
    ],
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
  {
    label: 'Es Recibo?',
    name: 'isReceipt',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Si' },
    ],
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
  {
    label: 'Incobrable?',
    name: 'uncollectible',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Si' },
    ],
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
];
