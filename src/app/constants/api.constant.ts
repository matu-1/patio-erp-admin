import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

export const API = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    RENEW: `${API_URL}/auth/renew`,
  },
  INVOICE: {
    GET_ALL: `${API_URL}/factura`,
    REVERT_PAYMENT: `${API_URL}/factura/revert-payment`,
    PAY: `${API_URL}/factura/pay`,
  },
  CAJA: {
    GET_ALL: `${API_URL}/caja`,
  },
  CUENTA_CONTABLE: {
    GET_ALL: `${API_URL}/cuenta-contable`,
  },
};
