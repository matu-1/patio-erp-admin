import { formatDate, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { FORMAT_DATE } from 'src/app/constants/format-date';
import { DateUtils } from 'src/app/utils/date.util';
import { FormatDate } from 'src/app/utils/format.date.util';
import { DeliveryDetail } from '../interfaces/delivery-detail.interface';
import {
  HoursWorkedDriver,
  OrderDto,
  TimingDto,
} from '../interfaces/hours-worked-driver.interface';
import { OrderReceived } from '../interfaces/order-received.interface';
import { Order } from '../interfaces/order.interface';
import { PaymentDetail } from '../interfaces/payment-detail.interface';

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
    field: 'amountHour',
    headerName: 'Monto Hora',
    valueFormatter: ({ amountHour }) => formatNumber(amountHour, 'es'),
  },
  {
    field: 'hours',
    headerName: 'Horas bruta',
    valueFormatter: ({ hoursWorked }) =>
      formatNumber(hoursWorked, 'es', '.0-6'),
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
    field: 'phone',
    headerName: 'Telefono',
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
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) =>
      formatDate(createdAt, 'dd/MM/yyyy HH:mm', 'es'),
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
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) => FormatDate.dateMoment(createdAt),
  },
];

export const timingsColumns: TableColumns<TimingDto> = [
  {
    field: 'timing_id',
    headerName: 'id',
  },
  {
    field: 'start_timing',
    headerName: 'Hora Entrada',
    valueFormatter: ({ start_timing }) => FormatDate.dateMoment(start_timing),
  },
  {
    field: 'arrived_at',
    headerName: 'Llegada',
    valueFormatter: ({ arrived_at }) => FormatDate.dateMoment(arrived_at),
  },
  {
    field: 'deserted_at',
    headerName: 'Abandono',
    valueFormatter: ({ deserted_at }) =>
      deserted_at ? FormatDate.dateMoment(deserted_at) : '---',
  },
  {
    field: 'end_timing',
    headerName: 'Hora Salida',
    valueFormatter: ({ end_timing }) => FormatDate.dateMoment(end_timing),
  },
  {
    field: 'lastOrderAt',
    headerName: 'Ultima Orden',
    valueFormatter: ({ lastOrderAt }) => FormatDate.dateMoment(lastOrderAt),
  },
  {
    field: 'lastOrderId',
    headerName: 'OrderId',
  },
  {
    field: 'endFinal',
    headerName: 'Fecha Final',
    valueFormatter: ({ endFinal }) => FormatDate.dateMoment(endFinal),
  },
  {
    field: 'hours',
    headerName: 'Horas',
    valueFormatter: ({ startFinal, endFinal }) =>
      DateUtils.formatToTimer(DateUtils.diff(endFinal, startFinal, 'h')),
  },
];

export const orderColumns: TableColumns<Order> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'to_address',
    headerName: 'Dirección',
  },
  {
    field: 'name_user',
    headerName: 'Cliente',
    valueFormatter: ({ name_user, phone_user }) =>
      `${name_user} - ${phone_user}`,
  },
  {
    field: 'merchant',
    headerName: 'Comercio',
    valueFormatter: ({ merchant }) => (merchant ? merchant.name : '---'),
  },
  {
    field: 'assignedDrivers',
    headerName: 'Driver',
    valueFormatter: ({ assignedDrivers }) =>
      assignedDrivers
        ? `${assignedDrivers[0].id} - ${assignedDrivers[0].name}`
        : '---',
  },
  {
    field: 'total',
    headerName: 'Total',
    valueFormatter: ({ total }) => formatNumber(total, 'es', '.2-2'),
  },
  {
    field: 'status',
    headerName: 'Estado',
  },
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) => formatDate(createdAt, FORMAT_DATE, 'es'),
  },
  {
    field: 'extra_status',
    headerName: 'Estados Adicionales',
    valueFormatter: ({ orderstatus }) =>
      orderstatus
        ? orderstatus
            .map(
              (status) =>
                ` ${formatDate(status.createdAt, FORMAT_DATE, 'es')} (${
                  status.status
                })`
            )
            .join(' - ')
        : '--',
  },
];
