import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { CustomValidators } from 'src/app/utils/validators';
import { collectFilterSchema } from '../../collect-driver/configs/form-schema';

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
    ],
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
  },
];

export const paymentFilterSchema = [...collectFilterSchema];
