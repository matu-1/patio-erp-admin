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
    get INVOICE_DETAIL() {
      return `/${this.ROOT}/${this.INVOICE_DETAIL_ROOT}`;
    },
  },
  REPORT: {
    ROOT: 'report',
    PAYMENT_DETAIL_ROOT: 'payment-detail',
    DELIVERY_DETAIL_ROOT: 'delivery-detail',
    HOURS_WORKED_ROOT: 'hours-worked',
    get PAYMENT_DETAIL() {
      return `/${this.ROOT}/${this.PAYMENT_DETAIL_ROOT}`;
    },
    get DELIVERY_DETAIL() {
      return `/${this.ROOT}/${this.DELIVERY_DETAIL_ROOT}`;
    },
    get HOURS_WORKED() {
      return `/${this.ROOT}/${this.HOURS_WORKED_ROOT}`;
    },
  },
};
