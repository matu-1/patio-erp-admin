import { TextFieldSchema } from 'src/app/components/text-field/text-field.interface';
import {
  collectFilterSchema,
  paySchema as payCollectSchema,
} from '../../collect-driver/configs/form-schema';

export const paySchema: TextFieldSchema = [...payCollectSchema];
export const paymentFilterSchema = [...collectFilterSchema];
