import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { CustomValidators } from 'src/app/utils/validators';

export const merchantCreateSchema: TextFieldSchema = [
  {
    label: 'Nombre',
    name: 'name',
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
    name: 'city',
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
    label: 'Distancia Maxima',
    name: 'max_distance',
    // value: 8,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'number',
        message: 'must be an number',
        validatorFn: CustomValidators.number,
      },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Foto',
    name: 'photo',
    fieldType: TextFieldType.File,
    fileAccept: 'image/*',
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
    name: 'phone',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'minlength',
        message: 'Minimum 8 characteres',
        validatorFn: Validators.minLength(8),
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
    label: 'Logo',
    name: 'logo',
    fieldType: TextFieldType.File,
    fileAccept: 'image/*',
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
    label: 'Categories',
    name: 'categories',
    fieldType: TextFieldType.Dropdown,
    options: [],
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
    label: 'Grupo CHAT',
    name: 'groupChat',
    options: [],
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
    label: 'ExternalId',
    name: 'externalId',
    options: [],
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
    label: 'Asignar en Listo?',
    name: 'readyAssignment',
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
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Descontar Propina?',
    name: 'discountTip',
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
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
];
