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
    label: 'Email',
    name: 'email',
    validators: [
      {
        name: 'email',
        message: 'must be an email',
        validatorFn: Validators.email,
      },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Cobrador',
    name: 'collectorId',
    fieldType: TextFieldType.Autocomplete,
    getOptionLabel: (value) => value?.label,
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
    label: 'WebhookUrl',
    name: 'webhookUrl',
    validators: [
      {
        name: 'url',
        message: 'must be an url',
        validatorFn: CustomValidators.url,
      },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
];
