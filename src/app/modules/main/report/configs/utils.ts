import { Order } from '../interfaces/order.interface';

export const getEarning = (order: Order) => {
  const modality = order.assignedDrivers?.[0]?.modality;
  if (modality == 'Tarifa base + Propina') return order.earningBase;
  if (modality == 'Distancia + Propina') return order.earningDistance;
  if (modality == 'Pedido monto fijo sin propina')
    return order.earningOrderFixed;
  return null;
};
