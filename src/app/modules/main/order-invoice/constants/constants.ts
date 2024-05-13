export const STATUS: Record<number, string> = {
  0: 'No Recibida',
  1: 'Recibida',
};

export const PAID: Record<number, string> = {
  0: 'no',
  1: 'pagado',
  2: 'parcial',
  3: 'conciliado',
  4: 'incobrable',
};

export const CLIENT_STATUS: Record<string, string> = {
  enabled: 'desbloquea',
  disabled: 'bloqueado',
  retired: 'retirado',
};
