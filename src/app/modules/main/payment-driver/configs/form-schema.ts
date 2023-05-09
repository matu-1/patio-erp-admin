import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { getWeeks } from 'src/app/utils/utils';
import { CONFIG } from '../../../../constants/config.constant';
import {
  collectFilterSchema,
  paySchema as payCollectSchema,
} from '../../collect-driver/configs/form-schema';

export const paySchema: TextFieldSchema = [...payCollectSchema];

export const weeksOptions = getWeeks().map((item) => ({
  label: item.name,
  value: item,
}));

export const paymentFilterSchema: TextFieldSchema = [
  ...collectFilterSchema,
  {
    label: 'Week',
    name: 'week',
    value: weeksOptions[0].value as any,
    fieldType: TextFieldType.Dropdown,
    options: weeksOptions,
  },
  {
    name: 'cityId',
    label: 'Ciudad',
    value: CONFIG.CITY_EEUU,
    fieldType: TextFieldType.Dropdown,
    df: '20%',
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
