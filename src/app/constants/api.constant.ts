import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

export const API = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    RENEW: `${API_URL}/auth/renew`,
  },
  INVOICE: {
    GET_ALL: `${API_URL}/factura`,
    UPDATE: `${API_URL}/factura/:id`,
    REVERT_PAYMENT: `${API_URL}/factura/revert-payment`,
    PAY: `${API_URL}/factura/pay`,
    SCHEDULE_PAYMENT: `${API_URL}/factura/schedule-payment`,
    RECALCULATE_INVOICE: `${API_URL}/factura/recalculate-invoice/:id`,
    INFO: `${API_URL}/factura/info/:id`,
  },
  INVOICE_DETAIL: {
    GET_BY_INVOICE: `${API_URL}/detalle-factura/invoice/:id`,
  },
  CAJA: {
    GET_ALL: `${API_URL}/caja`,
  },
  CUENTA_CONTABLE: {
    GET_ALL: `${API_URL}/cuenta-contable`,
  },
  REPORT: {
    GET_PAYMENT_DETAIL: `${API_URL}/factura/payment-detail`,
  },
};
