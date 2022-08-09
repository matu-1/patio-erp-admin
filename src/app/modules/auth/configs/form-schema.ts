import { Validators } from '@angular/forms';
import { TextFieldSchema } from '../../../components/text-field/text-field.interface';

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
    ],
  },
];
