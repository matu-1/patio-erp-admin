import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
const PATIO_STORE_API_URL = environment.patioStoreApiUrl;

export const API = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    RENEW: `${API_URL}/auth/renew`,
  },
  FACTURA: {
    GET_ALL: `${API_URL}/factura`,
    UPDATE: `${API_URL}/factura/:id`,
    REVERT_PAYMENT: `${API_URL}/factura/revert-payment`,
    PAY: `${API_URL}/factura/pay`,
    SCHEDULE_PAYMENT: `${API_URL}/factura/schedule-payment`,
    RECALCULATE_INVOICE: `${API_URL}/factura/recalculate-invoice/:id`,
    INFO: `${API_URL}/factura/info/:id`,
    GET_BY_YEAR: `${API_URL}/factura/invoice-by-year/:year`,
  },
  FACTURA_DETAIL: {
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
    GET_MERCHANTS_CITY: `${PATIO_STORE_API_URL}/merchants/city/:cityId`,
    GET_PAGINATED: `${PATIO_STORE_API_URL}/merchants/paginated`,
    GET_BY_ID: `${PATIO_STORE_API_URL}/merchants/:id`,
    CREATE: `${PATIO_STORE_API_URL}/merchants`,
    UPDATE: `${PATIO_STORE_API_URL}/merchants/:id`,
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
    GENERATE_COLLECTION: `${API_URL}/payment-driver/generate-collection`,
    DIVIDE: `${API_URL}/payment-driver/divide/:id`,
    GENERATE_BONUS_POINTS: `${API_URL}/payment-driver/generate-bonus`,
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
    GET_FULL_INFO: `${PATIO_STORE_API_URL}/drivers/full-info/:id`,
    GET_EARNING_FULL: `${PATIO_STORE_API_URL}/drivers/earning/full`,
  },
  ORDER: {
    GET_BY_ID: `${PATIO_STORE_API_URL}/orders/:id`,
    GET_ALL: `${PATIO_STORE_API_URL}/orders`,
    GET_COLLECT_MERCHANT: `${PATIO_STORE_API_URL}/orders/report/merchants`,
    GET_CASH: `${PATIO_STORE_API_URL}/orders/cash/complete`,
    GET_CATERING: `${PATIO_STORE_API_URL}/orders/report/catering`,
    PAY_TIP: `${PATIO_STORE_API_URL}/orders/pay/tip`,
    UPDATE_TIP: `${PATIO_STORE_API_URL}/orders/update/tip`,
  },
  BANK_ACCOUNT: {
    GET_BY_ID: `${PATIO_STORE_API_URL}/bank-account/:id`,
    CREATE: `${PATIO_STORE_API_URL}/bank-account`,
    UPDATE: `${PATIO_STORE_API_URL}/bank-account/:id`,
  },
  INVOICE: {
    GET_ALL: `${API_URL}/invoice`,
    GET_BY_RANGE: `${API_URL}/invoice/range`,
    CREATE: `${API_URL}/invoice`,
    UPDATE: `${API_URL}/invoice/:id`,
    GET_BY_ID: `${API_URL}/invoice/:id`,
  },
  FILE: {
    UPLOAD: `${PATIO_STORE_API_URL}/file/upload`,
  },
  ORDER_INVOICE: {
    INVOICES_DATA: `${PATIO_STORE_API_URL}/orders/invoices/data`,
    INVOICES_DATA_INFO: `${PATIO_STORE_API_URL}/orders/invoices/info`,
    GET_ALL: `${API_URL}/order-invoice`,
    GET_INFO: `${API_URL}/order-invoice/info/:id`,
    GENERATE: `${API_URL}/order-invoice`,
    REFRESH: `${API_URL}/order-invoice/recalculate-invoice/:id`,
    REVERT_PAYMENT: `${API_URL}/order-invoice/revert-payment`,
    PAY: `${API_URL}/order-invoice/pay`,
    SCHEDULE_PAYMENT: `${API_URL}/order-invoice/schedule-payment`,
    UPDATE: `${API_URL}/order-invoice/:id`,
  },
  MERCHANT_CLIENT: {
    GET_PAGINATED: `${PATIO_STORE_API_URL}/client/paginated`,
    GET_BY_ID: `${PATIO_STORE_API_URL}/client/:id`,
    CREATE: `${PATIO_STORE_API_URL}/client`,
    UPDATE: `${PATIO_STORE_API_URL}/client/:id`,
    CHANGE_STATUS: `${PATIO_STORE_API_URL}/client/change-status/:id`,
  },
};
