export const FLAG_TEXT: Record<number, string> = {
  0: 'No',
  1: 'Si',
};

export const ORDER_STATE = {
  assigned: 'assigned',
  pending: 'pending',
  dispatched: 'dispatched',
  confirmed: 'confirmed',
  complete: 'complete',
  canceled: 'canceled',
  disabled: 'disabled',
  delivered: 'delivered',
  arrived: 'arrived',
};

export const PAYMENT_MODE_ID: Record<number, string> = {
  1: 'CASH',
  2: 'ONLINE',
  3: 'QR',
};
