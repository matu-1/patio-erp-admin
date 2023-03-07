import { Moment } from 'moment-timezone';

export interface GetPaymentDetailDto {
  month: number[];
  management: number;
}

export interface PaymentDetail {
  id: number;
  id_cliente: number;
  cliente: string;
  estado: string;
  ciudad: string;
  mes: number;
  gestion: string;
  cobrador: string;
  monto_conciliado: string;
  'TOTAL COBRADO': string;
  monto_incobrable: string;
  'SALDO POR COBRAR': string;
  ingreso: null | string;
  egreso: string;
  saldo: null | string;
  pagado: string;
  fecha_transaccion: Date | null;
  fecha_pago: Date | null;
  'METODO DE COBRO': string | null;
  detalle: null | string;
  glosa: null | string;
  usuario: string | null;
}

export interface PaymentDriverDto {
  driverId: number;
  name: string;
  amount: number;
}

export interface CreatePaymentDriverDto {
  startDate: Date;
  endDate: Date;
  type: number;
}

export interface RefreshPaymentDto {
  startDate: Date | Moment;
  endDate: Date | Moment;
  type: number;
  driverId: number;
}

export interface BankAccount {
  id: number;
  accountNumber: string;
  bankName: string;
  accountType: string;
  identityNumber: string;
  driverId: number;
  verified: number;
}

export interface UpdateBankAccount extends Omit<BankAccount, 'id'> {
  accountNumber: string;
  bankName: string;
  accountType: string;
  identityNumber: string;
  driverId: number;
}
