export interface InvoiceDataDetail {
  ordersSumAll: number;
  pedidosSum: string;
  montoNetoSum: string;
  date: string;
  mes: number;
  gestion: string;
  id: number;
  isPagado: boolean;
  isVisto: boolean;
  programado: string;
  telefono: string;
  email: string;
  urlMultipago: string;
  ///
  quantity: number;
  commissionAmount: number;
  total: number;
  name: string;
  // id: number;
  management: number;
  month: number;
  paymentMerchants: PaymentMerchants[];
}

export interface PaymentMerchants {
  nombre_cliente: string;
  pedidos_sum: string;
  monto_conciliado: string;
  pagado: number;
  monto_sin_comision: string;
  monto: string;
  id_factura: number;
  nro_pedidos: number;
  id_local: string;
  porcentaje_comision: string;
  id_servicio: string;
  razon_adicional: null | string;
  local: string;
  porcentaje_comision_local: number;
  ciudad: string;
  latitude: string;
  longitude: string;
  fecha_cobro: null;
  visto: number;
  email: string;
  telefono: string;
  ///////
  clientId: number;
  client: string;
  quantity: number;
  commissionPercentage: number;
  phone: string;
  city: string;
  commissionAmount: number;
  total: number;
  clientStatus: string;
  clientEmail: string;
}
