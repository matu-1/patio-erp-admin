import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { DateUtils } from 'src/app/utils/date.util';

export const averageFilter: TextFieldSchema = [
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
    df: '11%',
    sm: '26%',
  },
  {
    name: 'end',
    label: 'Fecha Final',
    value: DateUtils.getMinHour(),
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    df: '11%',
    sm: '26%',
  },
  {
    name: 'cityId',
    label: 'Ciudad',
    fieldType: TextFieldType.Dropdown,
    df: '14%',
    sm: '29%',
  },
  {
    name: 'merchantId',
    label: 'Comercio',
    fieldType: TextFieldType.Dropdown,
    df: '15%',
    sm: '30%',
  },
];
