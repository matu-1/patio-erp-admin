import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { MODALITY } from 'src/app/constants/modality.constant';
import { DateUtils } from 'src/app/utils/date.util';
import { FormatDate } from 'src/app/utils/format.date.util';
import { formatToNumber, meterToMile } from 'src/app/utils/utils';
import { CollectMerchantDto } from '../interfaces/collect-merchant.interface';
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
    valueFormatter: ({ tips }) => formatToNumber(tips),
  },
  {
    field: 'tipsOriginal',
    headerName: 'Propina Original',
    valueFormatter: ({ tipsOriginal }) => formatToNumber(tipsOriginal),
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
    field: 'totalFees',
    headerName: 'Fees',
    valueFormatter: ({ totalFees }) => formatToNumber(totalFees),
  },
  {
    field: 'feesTip',
    headerName: 'Fees 2',
    valueFormatter: ({ feesTip }) => formatToNumber(feesTip),
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
    field: 'extraEarningPoints',
    headerName: 'Ganancia Puntos',
    valueFormatter: ({ extraEarningPoints }) =>
      formatToNumber(extraEarningPoints),
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
    field: 'timingBonus',
    headerName: 'Bono por Horario',
    valueFormatter: ({ timingBonus }) => formatToNumber(timingBonus),
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
    field: 'PAYMENT MODE',
    headerName: 'Payment Mode',
  },
  {
    field: 'BASIC FEE',
    headerName: 'Basic Fee Driver',
  },
  {
    field: 'basicFeeOrder',
    headerName: 'Basic Fee Order',
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
