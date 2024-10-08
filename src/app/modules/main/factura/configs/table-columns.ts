import { DatePipe, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { InvoiceDetail } from '../interfaces/invoice-info.interface';

export const facturaColumns: TableColumns = [
  {
    field: 'id',
    headerName: 'Recibo #',
  },
  {
    field: 'periodo',
    headerName: 'Periodo',
    valueFormatter: (item) => `${item.gestion}-${item.mes}`,
  },
  {
    field: 'nombre_cliente',
    headerName: 'Cliente',
    valueFormatter: (item) =>
      `${item.nombre_cliente} * ${item.ciudad} * ${item.telefono}`,
  },
  {
    field: 'nombre_cobrador',
    headerName: 'Cobrador',
  },
  {
    field: 'monto_conciliado',
    headerName: 'Monto',
  },
  {
    field: 'saldo',
    headerName: 'Saldo',
    valueFormatter: (item) =>
      item.pagado == 'no' ? item.monto_conciliado : item.saldo,
  },
  {
    field: 'pagado',
    headerName: 'Estado',
  },
  {
    field: 'fecha_cobro',
    headerName: 'Fecha Cobro',
    valueFormatter: ({ fecha_cobro }) =>
      new DatePipe('en').transform(fecha_cobro, 'dd/MM/yyyy'),
  },
  {
    field: 'programaciones',
    headerName: 'Rep.',
  },
  {
    field: 'comision',
    headerName: 'Comision',
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
  },
];

export const invoiceDetailColumns: TableColumns = [
  {
    field: 'id_local',
    headerName: '# Local',
  },
  {
    field: 'razon_adicional',
    headerName: 'Detalle',
  },
  {
    field: 'nro_pedidos',
    headerName: 'Pedidos',
  },
  {
    field: 'monto_sin_comision',
    headerName: 'Monto Pedidos',
  },
  {
    field: 'porcentaje_comision',
    headerName: 'Comisión (%)',
  },
  {
    field: 'monto',
    headerName: 'Monto Comisión',
  },
];
