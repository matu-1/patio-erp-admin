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
};
