import { formatDate, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { DateUtils } from 'src/app/utils/date.util';
import { DeliveryDetail } from '../interface/delivery-detail.interface';
import {
  HoursWorkedDriver,
  OrderDto,
  TimingDto,
} from '../interface/hours-worked-driver.interface';
import { OrderReceived } from '../interface/order-received.interface';
import { PaymentDetail } from '../interface/payment-detail.interface';

export const paymentDetailColumns: TableColumns<PaymentDetail> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'cliente',
    headerName: 'Cliente',
  },
  {
    field: 'ciudad',
    headerName: 'Ciudad',
  },
  {
    field: 'cobrador',
    headerName: 'Cobrador',
  },
  {
    field: 'monto',
    headerName: 'Monto',
    valueFormatter: ({ monto }) => formatNumber(Number(monto), 'es', '.2-2'),
  },
  {
    field: 'caja',
    headerName: 'Caja',
  },
  {
    field: 'ingreso',
    headerName: 'Ingreso',
    valueFormatter: ({ ingreso }) =>
      formatNumber(Number(ingreso), 'es', '.2-2'),
  },
  {
    field: 'egreso',
    headerName: 'Egreso',
    valueFormatter: ({ egreso }) => formatNumber(Number(egreso), 'es', '.2-2'),
  },
  {
    field: 'metodo_pago',
    headerName: 'Metodo Pago',
  },
  {
    field: 'fecha_pago',
    headerName: 'Fecha Pago',
    valueFormatter: ({ fecha_pago }) =>
      fecha_pago ? formatDate(fecha_pago, 'dd/MM/yyyy', 'es') : '--',
  },
];

export const deliveryDetailColumns: TableColumns<DeliveryDetail> = [
  {
    field: 'nombre',
    headerName: 'Nombre',
  },
  {
    field: 'ciudad',
    headerName: 'Ciudad',
  },
  {
    field: 'nombre_cliente',
    headerName: 'Cliente',
  },
  {
    field: 'telefono_cliente',
    headerName: 'Telefono',
  },
  {
    field: 'monto',
    headerName: 'Monto',
    valueFormatter: ({ monto }) => formatNumber(Number(monto), 'es', '.2-2'),
  },
  {
    field: 'comision',
    headerName: 'Comision',
    valueFormatter: ({ comision }) =>
      formatNumber(Number(comision), 'es', '.2-2'),
  },
  {
    field: 'metodo_pago',
    headerName: 'Metodo Pago',
  },
  {
    field: 'fecha',
    headerName: 'Fecha',
    valueFormatter: ({ fecha }) => formatDate(fecha, 'dd/MM/yyyy', 'es'),
  },
];

export const hoursWorkedColumns: TableColumns<HoursWorkedDriver> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'name',
    headerName: 'Nombre',
  },
  {
    field: 'phoneNumber',
    headerName: 'Telefono',
  },
  {
    field: 'modality',
    headerName: 'Tipo Acuerdo',
  },
  {
    field: 'quantity',
    headerName: 'Cant. Pedidos',
  },
  {
    field: 'tips',
    headerName: 'Propina',
    valueFormatter: ({ tips }) => formatNumber(tips, 'es'),
  },
  {
    field: 'hoursWorked',
    headerName: 'Horas',
    valueFormatter: ({ hoursWorked }) => DateUtils.formatToTimer(hoursWorked),
  },
  {
    field: 'totalEarning',
    headerName: 'Ganancia',
    valueFormatter: ({ totalEarning }) => formatNumber(totalEarning, 'es'),
  },
  {
    field: 'fees',
    headerName: 'Fees',
    valueFormatter: ({ fees }) => formatNumber(fees, 'es'),
  },
  {
    field: 'extraFees',
    headerName: 'Extra Fees',
    valueFormatter: ({ extraFees }) => formatNumber(extraFees, 'es'),
  },
  {
    field: 'discounts',
    headerName: 'Descuento',
    valueFormatter: ({ discounts }) => formatNumber(discounts, 'es'),
  },
  {
    field: 'total',
    headerName: 'Total',
    valueFormatter: ({ total }) => formatNumber(total, 'es'),
  },
  {
    field: 'average',
    headerName: 'Promedio',
    valueFormatter: ({ quantity, hoursWorked }) =>
      formatNumber(quantity / hoursWorked, 'es', '.0-2'),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];

export const ordersReceivedColumns: TableColumns<OrderReceived> = [
  {
    field: 'driver_id',
    headerName: 'Id driver',
  },
  {
    field: 'driver',
    headerName: 'Driver',
  },
  {
    field: 'order_id',
    headerName: 'Id Order',
  },
  {
    field: 'merchant',
    headerName: 'Merchant',
    valueFormatter: ({ merchant }) => merchant ?? '---',
  },
  {
    field: 'client',
    headerName: 'Client',
  },
  {
    field: 'to_address',
    headerName: 'Address', //'Dirección'
  },
  {
    field: 'moneyReceived',
    headerName: 'Money Received',
    valueFormatter: ({ moneyReceived }) =>
      formatNumber(moneyReceived, 'es', '.2-2'),
  },
  {
    field: 'moneyToReturn',
    headerName: 'Money To Return',
    valueFormatter: ({ moneyToReturn }) =>
      formatNumber(moneyToReturn, 'es', '.2-2'),
  },
];

export const ordersColumns: TableColumns<OrderDto> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'client',
    headerName: 'Cliente',
  },
  {
    field: 'to_address',
    headerName: 'Direccion',
  },
  {
    field: 'tip',
    headerName: 'Propina',
    valueFormatter: ({ tip }) => formatNumber(tip, 'es', '.2-2'),
  },
];
export const timingsColumns: TableColumns<TimingDto> = [
  {
    field: 'timing_id',
    headerName: 'id',
  },
  {
    field: 'arrived_at',
    headerName: 'Llegada',
    valueFormatter: ({ arrived_at }) =>
      formatDate(arrived_at, 'dd/MM/yyyy HH:mm:ss', 'es'),
  },
  {
    field: 'deserted_at',
    headerName: 'Abandono',
    valueFormatter: ({ deserted_at }) =>
      deserted_at
        ? formatDate(deserted_at, 'dd/MM/yyyy HH:mm:ss', 'es')
        : '---',
  },
  {
    field: 'end_timing',
    headerName: 'Hora Salida',
    valueFormatter: ({ end_timing }) =>
      formatDate(end_timing, 'dd/MM/yyyy HH:mm:ss', 'es'),
  },
  {
    field: 'lastOrderAt',
    headerName: 'Ultima Order',
    valueFormatter: ({ lastOrderAt }) =>
      formatDate(lastOrderAt, 'dd/MM/yyyy HH:mm:ss', 'es'),
  },
  {
    field: 'endFinal',
    headerName: 'Fecha Final',
    valueFormatter: ({ endFinal }) =>
      formatDate(endFinal, 'dd/MM/yyyy HH:mm:ss', 'es'),
  },
  {
    field: 'hours',
    headerName: 'Horas',
    valueFormatter: ({ arrived_at, endFinal }) =>
      DateUtils.formatToTimer(DateUtils.diff(endFinal, arrived_at, 'h')),
  },
];
