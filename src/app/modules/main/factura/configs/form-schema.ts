import { Validators } from '@angular/forms';
import {
  TextFieldSchema,
  TextFieldType,
} from 'src/app/components/text-field/text-field.interface';
import { CustomValidators } from 'src/app/utils/validators';

function generateYears(start: number = 2020) {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = 0; i <= currentYear - start; i++) {
    years.push(start + i);
  }
  return years;
}

export const invoiceFilterSchema: TextFieldSchema = [
  {
    name: 'id',
    label: 'Código',
    validators: [
      {
        name: 'int',
        validatorFn: CustomValidators.int,
        message: 'must be integer',
      },
    ],
    df: '16.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'mes',
    label: 'Meses',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 1, label: 'Enero' },
      { value: 2, label: 'Febrero' },
      { value: 3, label: 'Marzo' },
      { value: 4, label: 'Abril' },
      { value: 5, label: 'Mayo' },
      { value: 6, label: 'Junio' },
      { value: 7, label: 'Julio' },
      { value: 8, label: 'Agosto' },
      { value: 9, label: 'Septiembre' },
      { value: 10, label: 'Octubre' },
      { value: 11, label: 'Noviembre' },
      { value: 12, label: 'Diciembre' },
    ],
    df: '14.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'gestion',
    label: 'Gestión',
    fieldType: TextFieldType.Dropdown,
    options: generateYears(2020).map((year) => ({ value: year, label: year })),
    df: '14.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'ciudad',
    label: 'Ciudades',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 'Santa Cruz de la Sierra', label: 'Santa Cruz' },
      { value: 'Cochabamba', label: 'Cochabamba' },
      { value: 'La Paz', label: 'La Paz' },
      { value: 'Tarija', label: 'Tarija' },
      { value: 'Villa Imperial de Potos�', label: 'Potosi' },
    ],
    df: '18.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'estado',
    label: 'Estados',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 1, label: 'Recibida' },
      { value: 0, label: 'No Recibida' },
    ],
    df: '18.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'pagado',
    label: 'Moras',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 'pagado', label: 'Pagada' },
      { value: 'parcial', label: 'Con pago parcial' },
      { value: 'conciliado', label: 'Conciliado' },
      { value: 'incobrable', label: 'Incobrable' },
      { value: 'no', label: 'No Pagada' },
    ],
    df: '16.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'id_cobrador',
    label: 'Cobrador',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 1, label: 'Ejecutivo 1' },
      { value: 2, label: 'Ejecutivo 2' },
      { value: 3, label: 'Ejecutivo 3' },
      { value: 4, label: 'Ejecutivo 4' },
      { value: 5, label: 'Ejecutivo 5' },
    ],
    df: '18.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'orderBy',
    label: 'Ordenar',
    fieldType: TextFieldType.Dropdown,
    options: [
      { value: 'nombre_cliente', label: 'Nombre' },
      { value: 'monto_conciliado', label: 'Monto' },
    ],
    df: '14.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'estado_cobro',
    label: 'Programadas',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 'en fecha', label: 'Futuras' },
      { value: 'cobrar hoy', label: 'Hoy' },
      { value: 'cobro vencido', label: 'Vencidas' },
      { value: 'sin', label: 'Sin Programacion' },
    ],
    df: '16.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'estado_cliente',
    label: 'Clientes',
    fieldType: TextFieldType.Dropdown,
    multiple: true,
    options: [
      { value: 'bloqueado', label: 'Bloqueado' },
      { value: 'desbloquea', label: 'Desbloqueado' },
    ],
    df: '16.6%',
    xs: '100%',
    sm: '25%',
  },
  {
    name: 'search',
    label: 'Buscar',
    df: '19.6%',
    xs: '100%',
    sm: '25%',
  },
];

export const revertPaymentSchema: TextFieldSchema = [
  {
    name: 'gloss',
    label: 'Glosa',
    validators: [
      {
        name: 'required',
        validatorFn: Validators.required,
        message: 'Is required',
      },
      {
        name: 'minlength',
        validatorFn: Validators.minLength(3),
        message: 'Minimum 3 characters',
      },
    ],
  },
];

export const paySchema: TextFieldSchema = [
  {
    name: 'id_caja',
    label: 'Caja',
    df: '50%',
    xs: '100%',
  },
  {
    name: 'cuenta_contable_id',
    label: 'Banco',
    df: '50%',
    xs: '100%',
  },
  {
    name: 'ingreso',
    label: 'Ingreso',
    df: '50%',
    xs: '100%',
  },
  {
    name: 'fecha',
    label: 'Fecha',
    df: '50%',
    xs: '100%',
  },
  {
    name: 'glosa',
    label: 'Glosa',
    df: '100%',
    xs: '100%',
  },
];
