import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { PaymentDriver } from '../interfaces/payment-driver.interface';
import { formatToNumber, meterToMile } from 'src/app/utils/utils';
import { DateUtils } from 'src/app/utils/date.util';
import { BankAccountType } from '../../report/interfaces/hours-worked-driver.interface';
import { paymentsDriverColumnsExport } from '../../collect-driver/configs/export-columns';
import { MODALITY } from 'src/app/constants/modality.constant';

export const paymentsDriverExportColumns: TableColumns<PaymentDriver> = [
  ...paymentsDriverColumnsExport.slice(
    0,
    paymentsDriverColumnsExport.length - 1
  ),
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
      detail ? formatToNumber(detail.tips) : '---',
  },
  {
    field: 'tipsOriginal',
    headerName: 'Propina Original',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.tipsOriginal) : '---',
  },
  {
    field: 'totalDistance',
    headerName: 'Distancia (mi)',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(meterToMile(detail.totalDistance)) : '---',
  },
  {
    field: 'amountHour',
    headerName: 'Monto Hora',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.amountHour) : '---',
  },
  {
    field: 'hours',
    headerName: 'Horas bruta',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.hoursWorked) : '---',
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
      detail.modalityId != MODALITY.BASE_WITH_TIP &&
      detail.modalityId != MODALITY.DISTANCE_WITH_TIP
        ? formatToNumber(detail.totalEarning)
        : '---',
  },
  {
    field: 'totalEarning1',
    headerName: 'Ganancia Tarifa Base',
    valueFormatter: ({ detail }) =>
      detail && detail.modalityId == MODALITY.BASE_WITH_TIP
        ? formatToNumber(detail.totalEarning)
        : '---',
  },
  {
    field: 'totalEarning2',
    headerName: 'Ganancia por Distancia',
    valueFormatter: ({ detail }) =>
      detail && detail.modalityId == MODALITY.DISTANCE_WITH_TIP
        ? formatToNumber(detail.totalEarning)
        : '---',
  },
  {
    field: 'totalFees',
    headerName: 'Fees',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.totalFees) : '---',
  },
  {
    field: 'feesTip',
    headerName: 'Fees 2',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.feesTip) : '---',
  },
  {
    field: 'discounts',
    headerName: 'Descuento',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.discounts) : '---',
  },
  {
    field: 'extraEarning',
    headerName: 'Ganancia Extra',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.extraEarning) : '---',
  },
  {
    field: 'totalBonus',
    headerName: 'Bonos',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.totalBonus) : '---',
  },
  {
    field: 'timingExtraAmount',
    headerName: 'Bono Horario',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.timingExtraAmount) : '---',
  },
  {
    field: 'totalPrepaidAmount',
    headerName: 'Pago Anticipado',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.totalPrepaidAmount) : '---',
  },
  {
    field: 'timingBonus',
    headerName: 'Bono por Horario',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.timingBonus) : '---',
  },
  {
    field: 'total',
    headerName: 'Total',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.total) : '---',
  },
  {
    field: 'average',
    headerName: 'Promedio',
    valueFormatter: ({ detail }) =>
      detail ? formatToNumber(detail.average) : '---',
  },
];
