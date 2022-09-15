import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';

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
    name: 'nombre',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Ciudad',
    name: 'ciudad',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 'Santa Cruz', label: 'Santa Cruz' },
      { value: 'Cochabamba', label: 'Cochabamba' },
      { value: 'La Paz', label: 'La Paz' },
      { value: 'Tarija', label: 'Tarija' },
      { value: 'Potosi', label: 'Potosi' },
      { value: 'Juliaca', label: 'Juliaca' },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Ejecutivo',
    name: 'id_cobrador',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: '1', label: 'Ejecutivo 1' },
      { value: '2', label: 'Ejecutivo 2' },
      { value: '3', label: 'Ejecutivo 3' },
      { value: '4', label: 'Ejecutivo 4' },
      { value: '5', label: 'Ejecutivo 5' },
    ],
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Razon Social',
    name: 'RazonSocial',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'NIT',
    name: 'nit',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Banco',
    name: 'banco',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
  {
    label: 'Nro. Cuenta',
    name: 'nro_cuenta',
    df: '25%',
    xs: '100%',
    sm: '33%',
  },
];
