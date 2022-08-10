import { TextFieldSchema } from 'src/app/components/text-field/text-field.interface';

export const invoiceFilterSchema: TextFieldSchema = [
  {
    name: 'id',
    label: 'Código',
  },
  {
    name: 'mes',
    label: 'Meses',
  },
  {
    name: 'gestion',
    label: 'Gestion',
  },
  {
    name: 'ciudad',
    label: 'Ciudades',
  },
  {
    name: 'estado',
    label: 'Estados',
  },
  {
    name: 'pagado',
    label: 'Moras',
  },
  {
    name: 'id_cobrador',
    label: 'Cobrador',
  },
  {
    name: 'orderBy',
    label: 'Ordenar',
  },
  {
    name: 'estado_cobro',
    label: 'Programadas',
  },
  {
    name: 'estado_cliente',
    label: 'Clientes',
  },
  {
    name: 'search',
    label: 'Buscar',
  },
];
