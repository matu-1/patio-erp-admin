import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { getWeeks } from 'src/app/utils/utils';
import { CONFIG } from '../../../../constants/config.constant';
import {
  categoryValue,
  categoryText,
} from '../../collect-driver/constants/payment-method';
import {
  paySchema as payCollectSchema,
} from '../../collect-driver/configs/form-schema';

export const paySchema: TextFieldSchema = [...payCollectSchema];

export const weeksOptions = getWeeks().map((item) => ({
  label: item.name,
  value: item,
}));

export const paymentFilterSchema: TextFieldSchema = [
  {
    name: 'start',
    label: 'Fecha Inicial',
    value: weeksOptions[0].value.start,
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    sm: '25%',
    df: '14%',
  },
  {
    name: 'end',
    label: 'Fecha Final',
    value: weeksOptions[0].value.end,
    fieldType: TextFieldType.DatePicker,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
    sm: '25%',
    df: '14%',
  },
  {
    name: 'isPayment',
    label: 'Es Pagado',
    fieldType: TextFieldType.Dropdown,
    options: [
      { label: 'All', value: undefined },
      { label: 'Si', value: 1 },
      { label: 'No', value: 0 },
    ],
    sm: '20%',
    df: '12%',
  },
  {
    label: 'Categoria',
    name: 'category',
    fieldType: TextFieldType.Dropdown,
    options: [
      { label: 'All', value: undefined },
      ...Object.values(categoryValue).map((value) => ({
        label: categoryText[value],
        value: Number(value),
      })),
    ],
    sm: '20%',
    df: '12%',
  },
  {
    label: 'Week',
    name: 'week',
    value: weeksOptions[0].value as any,
    fieldType: TextFieldType.Dropdown,
    options: weeksOptions,
    df: '20%',
  },
  {
    name: 'cityId',
    label: 'Ciudad',
    value: CONFIG.CITY_EEUU,
    fieldType: TextFieldType.Dropdown,
    df: '15%',
  },
];

export const editPaymentDriverSchema: TextFieldSchema = [
  {
    label: 'Observación',
    name: 'observation',
    fieldType: TextFieldType.Textarea,
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
    ],
  },
];

export const payMultipleSchema: TextFieldSchema = [...payCollectSchema];
