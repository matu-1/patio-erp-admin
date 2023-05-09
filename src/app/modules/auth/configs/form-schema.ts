import { Validators } from '@angular/forms';
import { TextFieldSchema } from 'src/app/components/text-field/text-field.interface';

export const authSchema: TextFieldSchema = [
  {
    name: 'user',
    label: 'User',
    validators: [
      {
        message: 'Is required',
        name: 'required',
        validatorFn: Validators.required,
      },
      {
        message: 'Minimum 3 characters',
        name: 'minlength',
        validatorFn: Validators.minLength(3),
      },
    ],
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validators: [
      {
        message: 'Is required',
        name: 'required',
        validatorFn: Validators.required,
      },
      {
        message: 'Minimum 6 characters',
        name: 'minlength',
        validatorFn: Validators.minLength(6),
      },
    ],
  },
];
