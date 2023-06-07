import { formatDate, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { FormatDate } from 'src/app/utils/format.date.util';
import { paymentMethod } from '../constants/payment-method';
import { PaymentDriver } from '../interfaces/payment-driver.interface';
import { Payment } from '../interfaces/payment.interface';
import { paymentsDriverColumns as collectsDriverColumns } from '../../collect-driver/configs/table-columns';
import { meterToMile } from 'src/app/utils/utils';
import { DateUtils } from 'src/app/utils/date.util';
import { BankAccountType } from '../../report/interfaces/hours-worked-driver.interface';

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
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.accountNumber
        : '---',
  },
  {
    field: 'accountType',
    headerName: 'Tipo Cuenta (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.accountType
        : '---',
  },
  {
    field: 'bankName',
    headerName: 'Banco (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.bankName
        : '---',
  },
  {
    field: 'routingNumber',
    headerName: 'Routing Number (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.routingNumber
        : '---',
  },
  {
    field: 'phone',
    headerName: 'Celular (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.phone
        : '---',
  },
  {
    field: 'fullName',
    headerName: 'Nombre Completo (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.name
        : '---',
  },
  {
    field: 'address',
    headerName: 'Dirección (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.address
        : '---',
  },
  {
    field: 'socialSecurity',
    headerName: 'Social Security (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.socialSecurity
        : '---',
  },
  {
    field: 'paymentMethod',
    headerName: 'Método Pago (BA)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount &&
      detail.bankAccount.type == BankAccountType.BankAccount
        ? detail.bankAccount.paymentMethod
        : '---',
  },
  {
    field: 'fullNameZelle',
    headerName: 'Nombre Completo (Z)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount && detail.bankAccount.type == BankAccountType.Zelle
        ? detail.bankAccount.name
        : '---',
  },
  {
    field: 'phoneZelle',
    headerName: 'Celular o Correo (Z)',
    valueFormatter: ({ detail }) =>
      detail?.bankAccount && detail.bankAccount.type == BankAccountType.Zelle
        ? detail.bankAccount.phone
        : '---',
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
    field: 'totalDistance',
    headerName: 'Distancia (mi)',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(meterToMile(detail.totalDistance), 'es') : '---',
  },
  {
    field: 'amountHour',
    headerName: 'Monto Hora',
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
    field: 'totalBonus',
    headerName: 'Bonos',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.totalBonus, 'es') : '---',
  },
  {
    field: 'total',
    headerName: 'Total',
    valueFormatter: ({ detail }) =>
      detail ? formatNumber(detail.total, 'es') : '---',
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
    field: "driverId",
    headerName: "Id"
  },
  {
    field: "name",
    headerName: "Name"
  },
  {
    field: "balance",
    headerName: "Monto"
  }
];
