import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
const PATIO_STORE_API_URL = environment.patioStoreApiUrl;

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
    GET_DELIVERY_DETAIL: `${API_URL}/factura/delivery-detail`,
    GET_HOURS_WORKED_DRIVERS: `${PATIO_STORE_API_URL}/drivers/hours/worked`,
    GET_ORDERS_RECEIVED: `${PATIO_STORE_API_URL}/drivers/order/received`,
  },
  DASHBOARD: {
    GET_AVERAGE_STATUS: `${PATIO_STORE_API_URL}/orders/average/status`,
  },
  CITY: {
    GET_CITIES: `${PATIO_STORE_API_URL}/cities`,
  },
  MERCHANT: {
    GET_MERCHANTS: `${PATIO_STORE_API_URL}/merchants`,
  },
  PAYMENT_DRIVER: {
    GET_ALL: `${API_URL}/payment-driver`,
    GET_BY_RANGE: `${API_URL}/payment-driver/range`,
    GENERATE_PAYMENTS: `${API_URL}/payment-driver`,
    PAY: `${API_URL}/payment-driver/pay/:id`,
    REVERT: `${API_URL}/payment-driver/revert/:id`,
    PAYMENTS: `${API_URL}/payment/payment-driver/:id`,
    CREATE: `${API_URL}/payment-driver/create`,
    REFRESH: `${API_URL}/payment-driver/refresh`,
    PAY_MULTIPLE: `${API_URL}/payment-driver/pay-multiple`,
    UPDATE: `${API_URL}/payment-driver/:id`,
  },
  CLIENT: {
    GET_PAGINATED: `${API_URL}/client/paginated`,
    GET_BY_ID: `${API_URL}/client/:id`,
    CREATE: `${API_URL}/client`,
    UPDATE: `${API_URL}/client/:id`,
    CHANGE_STATUS: `${API_URL}/client/change-status/:id`,
  },
  DRIVER: {
    CHANGE_STATUS: `${PATIO_STORE_API_URL}/drivers/change-status/:id`,
    GET_BY_ID: `${PATIO_STORE_API_URL}/drivers/:id`,
    GET_ALL: `${PATIO_STORE_API_URL}/drivers`,
  },
  ORDER: {
    GET_BY_ID: `${PATIO_STORE_API_URL}/orders/:id`,
    GET_ALL: `${PATIO_STORE_API_URL}/orders`,
    GET_COLLECT_MERCHANT: `${PATIO_STORE_API_URL}/orders/report/merchants`,
  },
  BANK_ACCOUNT: {
    GET_BY_ID: `${PATIO_STORE_API_URL}/bank-account/:id`,
    CREATE: `${PATIO_STORE_API_URL}/bank-account`,
    UPDATE: `${PATIO_STORE_API_URL}/bank-account/:id`,
  },
};
