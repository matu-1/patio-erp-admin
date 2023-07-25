export interface Invoice {
  id: number;
  userCreation: null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  merchant: string;
  description: string;
  quantity: number;
  fee: string;
  amount: string;
  tips: string;
  total: string;
  startDate: Date;
  endDate: Date;
  backupUrl: string;
}

export interface CreateInvoiceDto extends Omit<Invoice, 'id' | 'createdAt'> {}
