import { formatDate, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { FORMAT_DATE } from 'src/app/constants/format-date';
import { MODALITY } from 'src/app/constants/modality.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { FormatDate } from 'src/app/utils/format.date.util';
import { formatToNumber, meterToMile } from 'src/app/utils/utils';
import { CollectMerchantDto } from '../interfaces/collect-merchant.interface';
import { DeliveryDetail } from '../interfaces/delivery-detail.interface';
import {
  BankAccountType,
  HoursWorkedDriver,
  OrderDto,
  TimingDto,
} from '../interfaces/hours-worked-driver.interface';
import { OrderReceived } from '../interfaces/order-received.interface';
import { Order } from '../interfaces/order.interface';
import { PaymentDetail } from '../interfaces/payment-detail.interface';
import { InvoiceByYear } from '../interfaces/invoice-by-year.interface';
import { DriverDto } from '../interfaces/driver.interface';

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
    field: 'TOTAL COBRADO',
    headerName: 'Total',
    valueFormatter: (value) =>
      formatNumber(Number(value['TOTAL COBRADO']), 'es', '.2-2'),
  },
  {
    field: 'SALDO POR COBRAR',
    headerName: 'Saldo',
    valueFormatter: (value) =>
      formatNumber(Number(value['SALDO POR COBRAR']), 'es', '.2-2'),
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
    field: 'METODO DE COBRO',
    headerName: 'Metodo Cobro',
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
    field: 'accountNumber',
    headerName: 'Número Cuenta (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.accountNumber : '---',
  },
  {
    field: 'accountType',
    headerName: 'Tipo Cuenta (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.accountType : '---',
  },
  {
    field: 'bankName',
    headerName: 'Banco (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.bankName : '---',
  },
  {
    field: 'routingNumber',
    headerName: 'Routing Number (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.routingNumber : '---',
  },
  {
    field: 'phone',
    headerName: 'Celular (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.phone : '---',
  },
  {
    field: 'fullName',
    headerName: 'Nombre Completo (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.name : '---',
  },
  {
    field: 'address',
    headerName: 'Dirección (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.address : '---',
  },
  {
    field: 'socialSecurity',
    headerName: 'Social Security (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.socialSecurity : '---',
  },
  {
    field: 'paymentMethod',
    headerName: 'Método Pago (BA)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.paymentMethod : '---',
  },
  {
    field: 'fullNameZelle',
    headerName: 'Nombre Completo (Z)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.nameZelle : '---',
  },
  {
    field: 'phoneZelle',
    headerName: 'Celular o Correo (Z)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount ? bankAccount.phoneZelle : '---',
  },
  {
    field: 'comments',
    headerName: 'Comentarios',
    valueFormatter: ({ comments }) => (comments ? comments : '---'),
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
    field: 'tipsOriginal',
    headerName: 'Propina Original',
    valueFormatter: ({ tipsOriginal }) => formatNumber(tipsOriginal, 'es'),
  },
  {
    field: 'totalDistance',
    headerName: 'Distancia (mi)',
    valueFormatter: ({ totalDistance }) =>
      formatNumber(meterToMile(totalDistance), 'es'),
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
    headerName: 'Ganancia por Hora',
    valueFormatter: ({ totalEarning, modalityId }) =>
      modalityId != MODALITY.BASE_WITH_TIP &&
      modalityId != MODALITY.DISTANCE_WITH_TIP
        ? formatNumber(totalEarning, 'es')
        : '---',
  },
  {
    field: 'totalEarning1',
    headerName: 'Ganancia Tarifa Base',
    valueFormatter: ({ totalEarning, modalityId }) =>
      modalityId == MODALITY.BASE_WITH_TIP
        ? formatNumber(totalEarning, 'es')
        : '---',
  },
  {
    field: 'totalEarning2',
    headerName: 'Ganancia por Distancia',
    valueFormatter: ({ totalEarning, modalityId }) =>
      modalityId == MODALITY.DISTANCE_WITH_TIP
        ? formatNumber(totalEarning, 'es')
        : '---',
  },
  {
    field: 'totalFees',
    headerName: 'Fees',
    valueFormatter: ({ totalFees }) => formatNumber(totalFees, 'es'),
  },
  {
    field: 'feesTip',
    headerName: 'Fees 2',
    valueFormatter: ({ feesTip }) => formatNumber(feesTip, 'es'),
  },
  {
    field: 'discounts',
    headerName: 'Descuento',
    valueFormatter: ({ discounts }) => formatNumber(discounts, 'es'),
  },
  {
    field: 'extraEarning',
    headerName: 'Ganancia Extra',
    valueFormatter: ({ extraEarning }) => formatNumber(extraEarning, 'es'),
  },
  {
    field: 'totalBonus',
    headerName: 'Bonos',
    valueFormatter: ({ totalBonus }) => formatNumber(totalBonus, 'es'),
  },
  {
    field: 'timingExtraAmount',
    headerName: 'Bono Horario',
    valueFormatter: ({ timingExtraAmount }) =>
      formatNumber(timingExtraAmount, 'es'),
  },
  {
    field: 'totalPrepaidAmount',
    headerName: 'Pago Anticipado',
    valueFormatter: ({ totalPrepaidAmount }) =>
      formatNumber(totalPrepaidAmount, 'es'),
  },
  {
    field: 'timingBonus',
    headerName: 'Bono por Horario',
    valueFormatter: ({ timingBonus }) => formatNumber(timingBonus, 'es'),
  },
  {
    field: 'total',
    headerName: 'Total',
    valueFormatter: ({ total }) => formatNumber(total, 'es'),
  },
  {
    field: 'average',
    headerName: 'Promedio',
    valueFormatter: ({ average }) => formatNumber(average, 'es', '.0-2'),
  },
  {
    field: 'averageCompleted',
    headerName: 'Promedio Completado',
    valueFormatter: ({ averageCompleted }) =>
      DateUtils.formatToTimer(averageCompleted),
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
  {
    field: 'actions',
    headerName: 'Acciones',
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
    headerName: 'Dirección',
  },
  {
    field: 'paymentMode',
    headerName: 'Payment Mode',
  },
  {
    field: 'totalOrder',
    headerName: 'Total Order',
    valueFormatter: ({ totalOrder }) => formatNumber(totalOrder, 'es', '.2-2'),
  },
  {
    field: 'tip',
    headerName: 'Propina',
    valueFormatter: ({ tip }) => formatNumber(tip, 'es', '.2-2'),
  },
  {
    field: 'tip_original',
    headerName: 'Tip Original',
    valueFormatter: ({ tip_original }) =>
      formatNumber(tip_original, 'es', '.2-2'),
  },
  {
    field: 'distance',
    headerName: 'Distancia (mts)',
    valueFormatter: ({ distance }) => formatNumber(distance, 'es'),
  },
  {
    field: 'distanceMi',
    headerName: 'Distancia (mi)',
    valueFormatter: ({ distance }) => formatNumber(meterToMile(distance), 'es'),
  },
  {
    field: 'bonus',
    headerName: 'Bonos',
    valueFormatter: ({ bonus }) => formatNumber(bonus, 'es'),
  },
  {
    field: 'earningWaiting',
    headerName: 'Ganancia Espera',
    valueFormatter: ({ earningBase, modalityId }) =>
      modalityId == MODALITY.BASE_WITH_TIP
        ? formatNumber(earningBase.earningWaiting, 'es')
        : '---',
  },
  {
    field: 'earningDistance',
    headerName: 'Ganancia Distancia',
    valueFormatter: ({ earningBase, modalityId }) =>
      modalityId == MODALITY.BASE_WITH_TIP
        ? formatNumber(earningBase.earningDistance, 'es')
        : '---',
  },
  {
    field: 'earning',
    headerName: 'Tarifa Base',
    valueFormatter: ({ earningBase, modalityId }) =>
      MODALITY.BASE_WITH_TIP == modalityId
        ? formatNumber(earningBase.earning, 'es', '.2-2')
        : '---',
  },
  {
    field: 'fee',
    headerName: 'Fee',
    valueFormatter: ({ earningBase, modalityId }) =>
      MODALITY.BASE_WITH_TIP == modalityId
        ? formatNumber(earningBase.discounts, 'es', '.2-2')
        : '---',
  },
  {
    field: 'totalEarning',
    headerName: 'Total',
    valueFormatter: ({ earningBase, modalityId }) =>
      modalityId == MODALITY.BASE_WITH_TIP
        ? formatNumber(earningBase.totalEarning, 'es', '.2-2')
        : '---',
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
    field: 'extraAmount',
    headerName: 'Monto Extra',
  },
  {
    field: 'bonus',
    headerName: 'Bono',
  },
  {
    field: 'hours',
    headerName: 'Horas',
    valueFormatter: ({ startFinal, endFinal }) =>
      DateUtils.formatToTimer(DateUtils.diff(endFinal, startFinal, 'h')),
  },
];

const BASE_WITH_TIP = 'Tarifa base + Propina';

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
    field: 'modality',
    headerName: 'Modalidad',
    valueFormatter: ({ assignedDrivers }) =>
      assignedDrivers ? assignedDrivers[0].modality : '---',
  },
  {
    field: 'basicFee',
    headerName: 'Basic Fee',
    valueFormatter: ({ assignedDrivers }) =>
      assignedDrivers ? assignedDrivers[0].fare_company_delivery : '---',
  },
  {
    field: 'vehicleType',
    headerName: 'Tipo Vehículo',
  },
  {
    field: 'paymentMode',
    headerName: 'Payment Mode',
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
    field: 'creation_date',
    headerName: 'Es programada?',
    valueFormatter: ({ createdAt, creation_date }) =>
      createdAt != creation_date ? 'Si' : 'No',
  },
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) => formatDate(createdAt, FORMAT_DATE, 'es'),
  },
  {
    field: 'extra_status',
    headerName: 'Estados Adicionales',
    valueFormatter: ({ orderStatus }) =>
      orderStatus
        ? orderStatus
            .filter(
              (item) => item.status == 'assigned' || item.status == 'delivered'
            )
            .map(
              (status) =>
                ` ${formatDate(status.createdAt, FORMAT_DATE, 'es')} (${
                  status.status
                })`
            )
            .join(' - ')
        : '--',
  },
  {
    field: 'meters_estimated_distance',
    headerName: 'Distancia (mts)',
  },
  {
    field: 'meters_estimated_distance_mi',
    headerName: 'Distancia (mi)',
    valueFormatter: ({ meters_estimated_distance }) =>
      meterToMile(meters_estimated_distance),
  },
  {
    field: 'tip_original',
    headerName: 'Tip Original',
  },
  {
    field: 'tip',
    headerName: 'Tip Driver',
    valueFormatter: ({ tip }) => formatToNumber(tip),
  },
  {
    field: 'bonus',
    headerName: 'Bonos',
  },
  {
    field: 'earning_waiting',
    headerName: 'Ganancia Espera',
    valueFormatter: ({ earningBase, assignedDrivers }) =>
      assignedDrivers?.[0]?.modality == BASE_WITH_TIP
        ? earningBase.earningWaiting
        : '---',
  },
  {
    field: 'earning_distance',
    headerName: 'Ganancia Distancia',
    valueFormatter: ({ earningBase, assignedDrivers }) =>
      assignedDrivers?.[0]?.modality == BASE_WITH_TIP
        ? formatToNumber(earningBase.earningDistance)
        : '---',
  },
  {
    field: 'earning',
    headerName: 'Total Ganancia Base',
    valueFormatter: ({ earningBase, assignedDrivers }) =>
      assignedDrivers?.[0]?.modality == BASE_WITH_TIP
        ? formatToNumber(earningBase.earning)
        : '---',
  },
  {
    field: 'fee',
    headerName: 'Fee',
    valueFormatter: ({ earningBase, assignedDrivers }) =>
      assignedDrivers?.[0]?.modality == BASE_WITH_TIP
        ? formatToNumber(earningBase.discounts)
        : '---',
  },
  {
    field: 'totalEarning',
    headerName: 'Total Ganancia',
    valueFormatter: ({ earningBase: { totalEarning }, assignedDrivers }) =>
      assignedDrivers?.[0]?.modality == BASE_WITH_TIP
        ? formatToNumber(totalEarning, 3)
        : '---',
  },
];

export const collectMerchantColumns: TableColumns<CollectMerchantDto> = [
  {
    field: '#',
    headerName: '#',
  },
  {
    field: 'RESTAURANT NAME',
    headerName: 'Restaurant Name',
  },
  {
    field: 'STORE NAME',
    headerName: 'Store Name',
  },
  {
    field: 'status',
    headerName: 'Status',
  },
  {
    field: 'USER NAME',
    headerName: 'User Name',
  },
  {
    field: 'DRIVER NAME',
    headerName: 'Driver Name',
    valueFormatter: (value) => value['DRIVER NAME'] ?? '---',
  },
  {
    field: 'TIP',
    headerName: 'Tip',
  },
  { field: 'PREPARATION TIME', headerName: 'Preparation Time' },
  { field: 'DELIVERY TIME', headerName: 'Delivery Time' },
  { field: 'ARRIVED TIME', headerName: 'Arrived Time' },
  { field: 'DISTANCE MILES', headerName: 'Distance Miles' },
  { field: 'BASIC FEE', headerName: 'Basic Fee' },
  { field: 'vehicleType', headerName: 'Vehicle Type' },
  { field: 'vehicleTypeDriver', headerName: 'Vehicle Type Driver' },
  {
    field: 'observations',
    headerName: 'Observations',
    valueFormatter: ({ observations }) => observations ?? '---',
  },
  { field: 'SUBTOTAL', headerName: 'Subtotal' },
  { field: 'type', headerName: 'Type' },
  {
    field: 'info_leave_delivery',
    headerName: 'Info Leave Delivery',
    valueFormatter: ({ info_leave_delivery }) => info_leave_delivery ?? '---',
  },
  {
    field: 'DATE',
    headerName: 'Date',
    valueFormatter: ({ DATE }) => FormatDate.shortMoment(DATE),
  },
  {
    field: 'HOUR',
    headerName: 'Hour',
    valueFormatter: ({ DATE }) => FormatDate.hourMoment(DATE),
  },
];

export const collectMerchantReportColumns: TableColumns<CollectMerchantDto> = [
  {
    field: '#',
    headerName: '#',
  },
  {
    field: 'RESTAURANT NAME',
    headerName: 'Restaurant Name',
  },
  {
    field: 'STORE NAME',
    headerName: 'Store Name',
  },
  {
    field: 'FROM ADDRESS',
    headerName: 'From Address',
  },
  {
    field: 'TO ADDRESS',
    headerName: 'To Address',
  },
  {
    field: 'LATITUDE',
    headerName: 'Latitude',
  },
  {
    field: 'LONGITUDE',
    headerName: 'Longitude',
  },
  {
    field: 'ID PROVIDER',
    headerName: 'Id Provider',
  },
  {
    field: 'ID TCC',
    headerName: 'Id Tcc',
  },
  {
    field: 'BASIC FEE',
    headerName: 'Basic Fee',
  },
  {
    field: 'TIP ORIGINAL',
    headerName: 'Tip Original',
  },
  {
    field: 'TIP',
    headerName: 'Tip',
  },
  {
    field: 'USER NAME',
    headerName: 'User Name',
  },
  {
    field: 'USER PHONE',
    headerName: 'User Phone',
  },
  {
    field: 'ORDER PROVIDER',
    headerName: 'Order Provider',
  },
  {
    field: 'DRIVER NAME',
    headerName: 'Driver Name',
    valueFormatter: (value) => value['DRIVER NAME'] ?? '---',
  },
  { field: 'PREPARATION TIME', headerName: 'Preparation Time' },
  { field: 'DELIVERY TIME', headerName: 'Delivery Time' },
  { field: 'ARRIVED TIME', headerName: 'Arrived Time' },
  { field: 'DISTANCE MILES', headerName: 'Distance Miles' },
  { field: 'vehicleType', headerName: 'Vehicle Type' },
  { field: 'vehicleTypeDriver', headerName: 'Vehicle Type Driver' },
  {
    field: 'observations',
    headerName: 'Observations',
    valueFormatter: ({ observations }) => observations ?? '---',
  },
  { field: 'SUBTOTAL', headerName: 'Subtotal' },
  { field: 'type', headerName: 'Type' },
  {
    field: 'DATE',
    headerName: 'Date',
    valueFormatter: ({ DATE }) => FormatDate.shortMoment(DATE),
  },
  {
    field: 'HOUR',
    headerName: 'Hour',
    valueFormatter: ({ DATE }) => FormatDate.hourMoment(DATE),
  },
  {
    field: 'status',
    headerName: 'Status',
  },
  {
    field: 'ISSUE',
    headerName: 'Issue',
  },
  {
    field: 'COMMENT',
    headerName: 'Comment',
  },
  {
    field: 'photo_delivery_url',
    headerName: 'Photo Delivery Url',
  },
  {
    field: 'url_image_reference',
    headerName: 'Image Reference',
  },
];

export const invoiceByYearColumns: TableColumns<InvoiceByYear> = [
  {
    field: 'id_cliente',
    headerName: 'Id',
  },
  {
    field: 'nombre_cliente',
    headerName: 'Cliente',
  },
  {
    field: 'ciudad',
    headerName: 'Ciudad',
  },
  {
    field: 'telefono',
    headerName: 'Telefono',
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  {
    field: 'comision',
    headerName: 'Comision',
  },
  {
    field: 'nombre_cobrador',
    headerName: 'Cobrador',
  },
];

export const driverColumns: TableColumns<DriverDto> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'name',
    headerName: 'Nombre',
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  {
    field: 'phone',
    headerName: 'Phone',
  },
  {
    field: 'status',
    headerName: 'Status',
  },
  {
    field: 'wallet',
    headerName: 'Wallet',
  },
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) => FormatDate.date(createdAt),
  },
  {
    field: 'actions',
    headerName: 'Actions',
  },
];
