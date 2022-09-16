import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { CustomValidators } from 'src/app/utils/validators';

export const clientFilterSchema: TextFieldSchema = [
  {
    label: 'Buscar',
    name: 'search',
    fullWidth: false,
  },
];

export const clientEditSchema: TextFieldSchema = [
  {
    label: 'Nombre',
    name: 'nombre',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Ciudad',
    name: 'ciudad',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 'Santa Cruz', label: 'Santa Cruz' },
      { value: 'Cochabamba', label: 'Cochabamba' },
      { value: 'La Paz', label: 'La Paz' },
      { value: 'Tarija', label: 'Tarija' },
      { value: 'Potosi', label: 'Potosi' },
      { value: 'Juliaca', label: 'Juliaca' },
    ],
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Ejecutivo',
    name: 'id_cobrador',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 1, label: 'Ejecutivo 1' },
      { value: 2, label: 'Ejecutivo 2' },
      { value: 3, label: 'Ejecutivo 3' },
      { value: 4, label: 'Ejecutivo 4' },
      { value: 5, label: 'Ejecutivo 5' },
    ],
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Razon Social',
    name: 'RazonSocial',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'NIT',
    name: 'nit',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Banco',
    name: 'banco',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Nro. Cuenta',
    name: 'nro_cuenta',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Fecha Ingreso',
    name: 'fecha_inicio',
    fieldType: TextFieldType.DatePicker,
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Representante',
    name: 'representante',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Teléfono',
    name: 'telefono',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'minlength',
        message: 'Minimum 7 characteres',
        validatorFn: Validators.minLength(7),
      },
      {
        name: 'int',
        message: 'must be integer',
        validatorFn: CustomValidators.int,
      },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Email',
    name: 'email',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
];

export const clientEditRep2Schema: TextFieldSchema = [
  {
    label: 'Representante 2',
    name: 'representante2',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
  {
    label: 'Teléfono 2',
    name: 'telefono2',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
  {
    label: 'Email 2',
    name: 'email2',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
];

export const clientEditRep3Schema: TextFieldSchema = [
  {
    label: 'Representante 3',
    name: 'representante3',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
  {
    label: 'Teléfono 3',
    name: 'telefono3',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
  {
    label: 'Email 3',
    name: 'email3',
    xs: '100%',
    sm: '50%',
    df: '33.3%',
  },
];
