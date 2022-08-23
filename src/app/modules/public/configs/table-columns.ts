import { TableColumns } from "src/app/components/data-table/data-table.interface";
import { InvoiceDetail } from '../../main/factura/interfaces/invoice-info.interface';
import { formatNumber } from '@angular/common';

export const additionalServiceColumns: TableColumns<InvoiceDetail> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'razon_adicional',
    headerName: 'Local',
    valueFormatter: (value) => `${value.razon_adicional} * ${value.local}`,
  },
  {
    field: 'nro_pedidos',
    headerName: 'Cant. Pedidos',
    valueFormatter: ({ nro_pedidos }) => formatNumber(nro_pedidos, 'es'),
  },
  {
    field: 'monto',
    headerName: 'Monto',
    valueFormatter: ({ monto }) => formatNumber(Number(monto), 'es', '.2-2'),
  },
];

export const salesColumns: TableColumns<InvoiceDetail> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'local',
    headerName: 'Local',
  },
  {
    field: 'nro_pedidos',
    headerName: 'Cant. Pedidos',
    valueFormatter: ({ nro_pedidos }) => formatNumber(nro_pedidos, 'es'),
  },
  {
    field: 'monto_sin_comision',
    headerName: 'Monto pedidos',
    valueFormatter: ({ monto_sin_comision }) =>
      formatNumber(Number(monto_sin_comision), 'es', '.2-2'),
  },
  {
    field: 'porcentaje_comision',
    headerName: 'Comisión',
    valueFormatter: ({ porcentaje_comision }) =>
      formatNumber(Number(porcentaje_comision), 'es', '.2-2'),
  },
  {
    field: 'monto',
    headerName: 'Monto',
    valueFormatter: ({ monto }) => formatNumber(Number(monto), 'es', '.2-2'),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];
