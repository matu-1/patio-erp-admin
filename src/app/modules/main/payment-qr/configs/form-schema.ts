import { TitleCasePipe } from '@angular/common';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { months } from 'src/app/constants/months.constant';
import { generateYears } from 'src/app/utils/utils';

export const filterPaymentQRSchema: TextFieldSchema = [
  {
    name: 'months',
    label: 'Meses',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: months.map((month, i) => ({
      label: new TitleCasePipe().transform(month),
      value: i + 1,
    })),
    sm: '25%',
    df: '15%',
  },
  {
    name: 'management',
    label: 'Gestion',
    fieldType: TextFieldType.Dropdown,
    options: generateYears().map((year) => ({ label: year, value: year })),
    sm: '20%',
    df: '10%',
  },
  {
    name: 'system',
    label: 'Sistema',
    fieldType: TextFieldType.Dropdown,
    options: [
      { label: 'Facturación', value: 'Facturacion' },
      { label: 'Crédito', value: 'credito' },
      { label: 'Patio Play', value: 'Patio Play' },
      { label: 'Patio Bussiness', value: 'Patio Bussiness' },
    ],
    sm: '25%',
    df: '15%',
  },
  {
    name: 'search',
    label: 'Buscar...',
    sm: '25%',
    df: '20%',
  },
];
