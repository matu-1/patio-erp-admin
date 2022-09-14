import { PAGE_ROUTE } from '../../../constants/page-route.constant';

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  items?: MenuItem[];
}

export const MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: PAGE_ROUTE.HOME,
  },
  {
    label: 'Clientes',
    icon: 'face',
    items: [
      {
        label: 'Facturas',
        icon: 'remove',
        route: PAGE_ROUTE.INVOICE.LIST,
      },
      {
        label: 'Clientes',
        icon: 'remove',
        route: PAGE_ROUTE.HOME,
      },
    ],
  },
  {
    label: 'Transacciones',
    icon: 'receipt_long',
    items: [
      {
        label: 'Pagos Tarjeta',
        icon: 'remove',
        route: PAGE_ROUTE.HOME,
      },
      {
        label: 'Pagos QR',
        icon: 'remove',
        route: PAGE_ROUTE.HOME,
      },
      {
        label: 'Pagos Driver',
        icon: 'remove',
        route: PAGE_ROUTE.PAYMENT_DRIVER.LIST,
      },
    ],
  },
  {
    label: 'Reportes',
    icon: 'flag',
    items: [
      {
        label: 'Financieros',
        icon: 'category',
        items: [
          {
            label: 'Detalle Pago',
            icon: 'remove',
            route: PAGE_ROUTE.REPORT.PAYMENT_DETAIL,
          },
        ],
      },
      {
        label: 'Logistico',
        icon: 'motorcycle',
        items: [
          {
            label: 'Detalle Delivery',
            icon: 'remove',
            route: PAGE_ROUTE.REPORT.DELIVERY_DETAIL,
          },
          {
            label: 'Horas Trabajadas',
            icon: 'remove',
            route: PAGE_ROUTE.REPORT.HOURS_WORKED,
          },
          {
            label: 'Ordenes Recibidas',
            icon: 'remove',
            route: PAGE_ROUTE.REPORT.ORDERS_RECEIVED,
          },
        ],
      },
    ],
  },
];
