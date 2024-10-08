export const PAGE_ROUTE = {
  HOME_ROOT: '',
  HOME: '/',
  AUTH: {
    ROOT: 'auth',
    LOGIN_ROOT: 'login',
    get LOGIN() {
      return `${this.ROOT}/${this.LOGIN_ROOT}`;
    },
  },
  INVOICE: {
    ROOT: 'invoice',
    LIST_ROOT: '',
    CREATE_ROOT: 'create',
    get LIST() {
      return `/${this.ROOT}/${this.LIST_ROOT}`;
    },
    get CREATE() {
      return `/${this.ROOT}/${this.CREATE_ROOT}`;
    },
  },
  PUBLIC: {
    ROOT: 'public',
    INVOICE_DETAIL_ROOT: 'invoice/:code',
    ORDER_TRACKING_ROOT: 'order-tracking/:id',
    get INVOICE_DETAIL() {
      return `/${this.ROOT}/${this.INVOICE_DETAIL_ROOT}`;
    },
  },
  REPORT: {
    ROOT: 'report',
    PAYMENT_DETAIL_ROOT: 'payment-detail',
    DELIVERY_DETAIL_ROOT: 'delivery-detail',
    HOURS_WORKED_ROOT: 'hours-worked',
    ORDERS_RECEIVED_ROOT: 'orders-received',
    ORDERS_ROOT: 'orders',
    COLLECT_MERCHANT_ROOT: 'collect-merchant',
    get PAYMENT_DETAIL() {
      return `/${this.ROOT}/${this.PAYMENT_DETAIL_ROOT}`;
    },
    get DELIVERY_DETAIL() {
      return `/${this.ROOT}/${this.DELIVERY_DETAIL_ROOT}`;
    },
    get HOURS_WORKED() {
      return `/${this.ROOT}/${this.HOURS_WORKED_ROOT}`;
    },
    get ORDERS_RECEIVED() {
      return `/${this.ROOT}/${this.ORDERS_RECEIVED_ROOT}`;
    },
    get ORDERS() {
      return `/${this.ROOT}/${this.ORDERS_ROOT}`;
    },
    get COLLECT_MERCHANT() {
      return `/${this.ROOT}/${this.COLLECT_MERCHANT_ROOT}`;
    },
  },
  PAYMENT_DRIVER: {
    ROOT: 'payment-driver',
    LIST_ROOT: '',
    CREATE_ROOT: 'create',
    get LIST() {
      return `/${this.ROOT}/${this.LIST_ROOT}`;
    },
    get CREATE() {
      return `/${this.ROOT}/${this.CREATE_ROOT}`;
    },
  },
  COLLECT_DRIVER: {
    ROOT: 'collet-driver',
    LIST_ROOT: '',
    CREATE_ROOT: 'create',
    get LIST() {
      return `/${this.ROOT}/${this.LIST_ROOT}`;
    },
    get CREATE() {
      return `/${this.ROOT}/${this.CREATE_ROOT}`;
    },
  },
  CLIENT: {
    ROOT: 'client',
    LIST_ROOT: '',
    CREATE_ROOT: 'create',
    EDIT_ROOT: 'edit/:id',
    get LIST() {
      return `/${this.ROOT}/${this.LIST_ROOT}`;
    },
    get EDIT() {
      return `/${this.ROOT}/${this.EDIT_ROOT}`;
    },
    get CREATE() {
      return `/${this.ROOT}/${this.CREATE_ROOT}`;
    },
  },
  PAYMENT_QR: {
    ROOT: 'payment-qr',
    LIST_ROOT: '',
    get LIST() {
      return `${this.ROOT}/${this.LIST_ROOT}`;
    },
  },
};
