import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { MODALITY } from 'src/app/constants/modality.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { FormatDate } from 'src/app/utils/format.date.util';
import { formatToNumber, meterToMile } from 'src/app/utils/utils';
import {
  BankAccountType,
  HoursWorkedDriver,
  OrderDto,
} from '../interfaces/hours-worked-driver.interface';

export const hoursWorkedColumnsExport: TableColumns<HoursWorkedDriver> = [
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
    field: 'bankAccount',
    headerName: 'Cuenta Bancaria (AN,AT,RN,P,N,A,SS,PM)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount && bankAccount.type == BankAccountType.BankAccount
        ? `${bankAccount.accountNumber} - ${bankAccount.accountType} - ${bankAccount.routingNumber} - ${bankAccount.phone} - ${bankAccount.name} - ${bankAccount.address} - ${bankAccount.socialSecurity} - ${bankAccount.paymentMethod}`
        : '---',
  },
  {
    field: 'zelle',
    headerName: 'Zelle (N,P)',
    valueFormatter: ({ bankAccount }) =>
      bankAccount && bankAccount.type == BankAccountType.Zelle
        ? `${bankAccount.name} - ${bankAccount.phone}`
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
  },
  {
    field: 'tips',
    headerName: 'Propina',
    valueFormatter: ({ tips }) => formatToNumber(tips),
  },
  {
    field: 'totalDistance',
    headerName: 'Distancia (mi)',
    valueFormatter: ({ totalDistance }) => meterToMile(totalDistance),
  },
  {
    field: 'amountHour',
    headerName: 'Monto Hora',
    valueFormatter: ({ amountHour }) => formatToNumber(amountHour),
  },
  {
    field: 'hours',
    headerName: 'Horas bruta',
    valueFormatter: ({ hoursWorked }) => formatToNumber(hoursWorked, 6),
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
        ? formatToNumber(totalEarning)
        : '---',
  },
  {
    field: 'totalEarning1',
    headerName: 'Ganancia Tarifa Base',
    valueFormatter: ({ totalEarning, modalityId }) =>
      modalityId == MODALITY.BASE_WITH_TIP
        ? formatToNumber(totalEarning)
        : '---',
  },
  {
    field: 'totalEarning2',
    headerName: 'Ganancia por Distancia',
    valueFormatter: ({ totalEarning, modalityId }) =>
      modalityId == MODALITY.DISTANCE_WITH_TIP
        ? formatToNumber(totalEarning)
        : '---',
  },
  {
    field: 'fees',
    headerName: 'Fees',
    valueFormatter: ({ fees }) => formatToNumber(fees),
  },
  {
    field: 'extraFees',
    headerName: 'Extra Fees',
    valueFormatter: ({ extraFees }) => formatToNumber(extraFees),
  },
  {
    field: 'discounts',
    headerName: 'Descuento',
    valueFormatter: ({ discounts }) => formatToNumber(discounts),
  },
  {
    field: 'extraEarning',
    headerName: 'Ganancia Extra',
    valueFormatter: ({ extraEarning }) => formatToNumber(extraEarning),
  },
  {
    field: 'totalBonus',
    headerName: 'Bonos',
    valueFormatter: ({ totalBonus }) => formatToNumber(totalBonus),
  },
  {
    field: 'timingExtraAmount',
    headerName: 'Bono Horario',
    valueFormatter: ({ timingExtraAmount }) =>
      formatToNumber(timingExtraAmount),
  },
  {
    field: 'totalPrepaidAmount',
    headerName: 'Pago Anticipado',
    valueFormatter: ({ totalPrepaidAmount }) =>
      formatToNumber(totalPrepaidAmount),
  },
  {
    field: 'total',
    headerName: 'Total',
    valueFormatter: ({ total }) => formatToNumber(total),
  },
  {
    field: 'average',
    headerName: 'Promedio',
    valueFormatter: ({ average }) => formatToNumber(average),
  },
  {
    field: 'averageCompleted',
    headerName: 'Promedio Completado',
    valueFormatter: ({ averageCompleted }) =>
      DateUtils.formatToTimer(averageCompleted),
  },
];

export const ordersColumnsExport: TableColumns<OrderDto> = [
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
    field: 'tip',
    headerName: 'Propina',
    valueFormatter: ({ tip }) => formatToNumber(tip),
  },
  {
    field: 'distance',
    headerName: 'Distancia (mts)',
    valueFormatter: ({ distance }) => formatToNumber(distance),
  },
  {
    field: 'distance',
    headerName: 'Distancia (mi)',
    valueFormatter: ({ distance }) => formatToNumber(meterToMile(distance)),
  },
  {
    field: 'bonus',
    headerName: 'Bonos',
    valueFormatter: ({ bonus }) => formatToNumber(bonus),
  },
  {
    field: 'earningWaiting',
    headerName: 'Ganancia Espera',
    valueFormatter: ({ earningBase, modalityId }) =>
      modalityId == MODALITY.BASE_WITH_TIP
        ? formatToNumber(earningBase.earningWaiting)
        : '---',
  },
  {
    field: 'earningDistance',
    headerName: 'Ganancia Distancia',
    valueFormatter: ({ earningBase, modalityId }) =>
      modalityId == MODALITY.BASE_WITH_TIP
        ? formatToNumber(earningBase.earningDistance)
        : '---',
  },
  {
    field: 'earning',
    headerName: 'Tarifa Base',
    valueFormatter: ({ earningBase, modalityId }) =>
      MODALITY.BASE_WITH_TIP == modalityId
        ? formatToNumber(earningBase.earning)
        : '---',
  },
  {
    field: 'totalEarning',
    headerName: 'Total',
    valueFormatter: ({ earningBase, modalityId }) =>
      modalityId == MODALITY.BASE_WITH_TIP
        ? formatToNumber(earningBase.totalEarning)
        : '---',
  },
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) => FormatDate.dateMoment(createdAt),
  },
];
