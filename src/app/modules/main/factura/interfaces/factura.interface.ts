export interface Factura {
  id: number;
  id_cliente: number;
  fecha_emision: Date;
  mes: number;
  gestion: string;
  es_recibo: number;
  nro_factura: string;
  razon_social: string;
  nit: string;
  comentarios: string;
  estado: number;
  monto_conciliado: string;
  monto: string;
  pagado: string;
  incobrable: number;
  monto_incobrable: string;
  DateCreation: Date;
  DateModification: Date;
  IsDeleted: number;
  UserCreation: string;
  UserModification: string;
  nombre_cliente: string;
  representante: string;
  telefono: string;
  email: string;
  ciudad: string;
  estado_cliente: string;
  saldo: string;
  fecha_cobro: null;
  estado_cobro: string;
  contacto_verificado: null;
  nombre_cobrador: string;
  id_cobrador: number;
  comision: number;
  locales: string;
  monto_ventas: string;
  id_ultimo_pago: null;
}

export type QueryInvoice = {
  limit: number;
  page: number;
  length: number;
};
