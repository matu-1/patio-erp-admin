export interface InvoiceInfo {
  invoiceDetails: InvoiceDetail[];
  ordersSumAll: number;
  pedidosSum: string;
  montoNetoSum: string;
  nombre: string;
  date: string;
  mes: number;
  gestion: string;
  id: number;
}

export interface InvoiceDetail {
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
  pdf?: PDF;
  excel?: Excel;
}

export interface Excel {
  pdf_array: any[];
  mes: number;
  gestion: string;
}

export interface PDF {
  id_factura: number;
  fecha: string;
  monto_neto_sum: string;
  monto_pedidos_sum: string;
  pdf_array: any[];
  nombre: string;
  ciudad: string;
  mes: number;
  gestion: string;
  id_servicio: string;
  razon_adicional: null;
}
