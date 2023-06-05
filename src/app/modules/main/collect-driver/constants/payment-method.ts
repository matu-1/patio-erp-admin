export const paymentMethod: Record<number, string> = {
  0: 'Efectivo',
  1: 'Wallet',
  2: 'Cuenta Bancaria',
  3: 'Soli',
  4: 'Conciliación sin ingreso',
  5: 'Cuenta Citibank',
  6: 'Cuenta Jp Bank of America',
  7: 'Cuenta Angela Bank of America',
  8: 'Zelle',
  9: 'quickbooks',
};

export const categoryValue = {
  delivery: 0,
  debt: 1,
  other: 2,
};

export const categoryText: Record<number, string> = {
  [categoryValue.delivery]: 'Delivery',
  [categoryValue.debt]: 'Deuda',
  [categoryValue.other]: 'Otros',
};
