export interface GetDeliveryDetailDto {
  start: Date;
  end: Date;
  showDetails: number;
}

export interface DeliveryDetail {
  id_local: number;
  id_pedido: string;
  nombre: string;
  ciudad: string;
  id_cliente: number;
  nombre_cliente: string;
  telefono_cliente: string;
  monto: string;
  costo_envio: number;
  descuento_jugno: number;
  metodo_pago: string;
  fecha: Date;
  mes: number;
  gestion: string;
  estado: string;
  porcentaje_comision: number | null;
  comision: number | null;
}
