import { formatDate, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { FormatDate } from 'src/app/utils/format.date.util';
import { paymentMethod } from '../constants/payment-method';
import { PaymentDriver } from '../interfaces/payment-driver.interface';
import { Payment } from '../interfaces/payment.interface';
import { paymentsDriverColumns as collectsDriverColumns } from '../../collect-driver/configs/table-columns';
import { meterToMile } from 'src/app/utils/utils';
import { DateUtils } from 'src/app/utils/date.util';
import { MODALITY } from 'src/app/constants/modality.constant';

export const paymentsDriverColumns: TableColumns<PaymentDriver> = [
  ...collectsDriverColumns.slice(0, collectsDriverColumns.length - 1),
  {
    field: 'averageCompleted',
    headerName: 'Promedio Completado',
    valueFormatter: ({ averageCompleted }) =>
      averageCompleted ? DateUtils.formatToTimer(averageCompleted) : '---',
  },
  {
    field: 'modality',
    headerName: 'Tipo Acuerdo',
    valueFormatter: ({ detail }) => (detail ? detail.modality : '---'),
  },
  {
    field: 'accountNumber',
    headerName: 'Número Cuenta (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.accountNumber : '---',
  },
  {
    field: 'accountType',
    headerName: 'Tipo Cuenta (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.accountType : '---',
  },
  {
    field: 'bankName',
    headerName: 'Banco (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.bankName : '---',
  },
  {
    field: 'routingNumber',
    headerName: 'Routing Number (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.routingNumber : '---',
  },
  {
    field: 'phone',
    headerName: 'Celular (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.phone : '---',
  },
  {
    field: 'fullName',
    headerName: 'Nombre Completo (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.name : '---',
  },
  {
    field: 'address',
    headerName: 'Dirección (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.address : '---',
  },
  {
    field: 'socialSecurity',
    headerName: 'Social Security (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.socialSecurity : '---',
  },
  {
    field: 'paymentMethod',
    headerName: 'Método Pago (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.paymentMethod : '---',
  },
  {
    field: 'fullNameZelle',
    headerName: 'Nombre Completo (Z)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.nameZelle : '---',
  },
  {
    field: 'phoneZelle',
    headerName: 'Celular o Correo (Z)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount ? detail.bankAccount.phoneZelle : '---',
  },
  {
    field: 'comments',
    headerName: 'Comentarios',
    valueFormatter: ({ comments }) => (comments ? comments : '---'),
  },
  {
    field: 'quantity',
    headerName: 'Cant. Pedidos',
    valueFormatter: ({ detail }) => (detail ? detail.quantity : '---'),
  },
  {
    field: 'tips',
    headerName: 'Propina',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.tips, 'es') : '---',
  },
  {
    field: 'tipsOriginal',
    headerName: 'Propina Original',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.tipsOriginal, 'es') : '---',
  },
  {
    field: 'totalDistance',
    headerName: 'Distancia (mi)',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(meterToMile(detail.totalDistance), 'es') : '---',
  },
  {
    field: 'amountHour',
    headerName: 'Monto Hora/Ord',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.amountHour, 'es') : '---',
  },
  {
    field: 'hours',
    headerName: 'Horas bruta',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.hoursWorked, 'es', '.0-6') : '---',
  },
  {
    field: 'hoursWorked',
    headerName: 'Horas',
    valueFormatter: ({ detail }) =>
      detail ? DateUtils.formatToTimer(detail.hoursWorked) : '---',
  },
  {
    field: 'totalEarning',
    headerName: 'Ganancia por Hora',
    valueFormatter: ({ detail }) =>
      detail &&
      (detail.modalityId == MODALITY.ONLY_HOUR ||
        detail.modalityId == MODALITY.HOUR_WITH_TIP)
        ? formatNumber(detail.totalEarning, 'es')
        : '---',
  },
  {
    field: 'totalEarning1',
    headerName: 'Ganancia Tarifa Base',
    valueFormatter: ({ detail }) =>
      detail && detail.modalityId == MODALITY.BASE_WITH_TIP
        ? formatNumber(detail.totalEarning, 'es')
        : '---',
  },
  {
    field: 'totalEarning2',
    headerName: 'Ganancia por Distancia',
    valueFormatter: ({ detail }) =>
      detail && detail.modalityId == MODALITY.DISTANCE_WITH_TIP
        ? formatNumber(detail.totalEarning, 'es')
        : '---',
  },
  {
    field: 'totalEarning3',
    headerName: 'Ganancia por orden fija',
    valueFormatter: ({ detail }) =>
      detail && detail.modalityId == MODALITY.ONLY_ORDER_FIXED
        ? formatNumber(detail.totalEarning, 'es')
        : '---',
  },
  {
    field: 'totalFees',
    headerName: 'Fees',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.totalFees, 'es') : '---',
  },
  {
    field: 'feesTip',
    headerName: 'Fees 2',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.feesTip, 'es') : '---',
  },
  {
    field: 'discounts',
    headerName: 'Descuento',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.discounts, 'es') : '---',
  },
  {
    field: 'extraEarning',
    headerName: 'Ganancia Extra',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.extraEarning, 'es') : '---',
  },
  {
    field: 'extraEarningPoints',
    headerName: 'Ganancia Puntos',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.extraEarningPoints, 'es') : '---',
  },
  {
    field: 'totalBonus',
    headerName: 'Bonos',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.totalBonus, 'es') : '---',
  },
  {
    field: 'timingExtraAmount',
    headerName: 'Bono Horario',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.timingExtraAmount, 'es') : '---',
  },
  {
    field: 'totalPrepaidAmount',
    headerName: 'Pago Anticipado',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.totalPrepaidAmount, 'es') : '---',
  },
  {
    field: 'timingBonus',
    headerName: 'Bono por Horario',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.timingBonus, 'es') : '---',
  },
  {
    field: 'total',
    headerName: 'Total',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.total, 'es') : '---',
  },
  {
    field: 'average',
    headerName: 'Promedio',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.average, 'es', '.0-2') : '---',
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];
// paymentsDriverColumns.splice(8, 2)

export const paymentsColumns: TableColumns<Payment> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'amount',
    headerName: 'Monto',
    valueFormatter: ({ amount }) => formatNumber(Number(amount), 'es', '.2-2'),
  },
  {
    field: 'paymentMethod',
    headerName: 'Método Pago',
    valueFormatter: (value) => paymentMethod[value.paymentMethod],
  },
  {
    field: 'paidAt',
    headerName: 'Pagado el',
    valueFormatter: ({ paidAt }) => FormatDate.short(paidAt),
  },
  {
    field: 'bankAccount',
    headerName: 'Cuenta Bancaria',
    valueFormatter: ({ bankAccount }) => {
      bankAccount = JSON.parse(bankAccount);
      return bankAccount
        ? `${bankAccount.accountNumber} - ${bankAccount.bankName}`
        : '---';
    },
  },
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) =>
      formatDate(createdAt, 'dd/MM/yyyy HH:mm', 'es'),
  },
];

export const driversPaymentsColumns: TableColumns = [
  {
    field: 'driverId',
    headerName: 'Id',
  },
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'balance',
    headerName: 'Monto',
  },
];
