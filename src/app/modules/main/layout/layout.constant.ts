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
        route: PAGE_ROUTE.CLIENT.LIST,
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
        route: PAGE_ROUTE.PAYMENT_QR.LIST,
      },
      {
        label: 'Cobros Driver',
        icon: 'remove',
        route: PAGE_ROUTE.COLLECT_DRIVER.LIST,
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
          {
            label: 'Cobro Comercio',
            icon: 'remove',
            route: PAGE_ROUTE.REPORT.COLLECT_MERCHANT,
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
          {
            label: 'Ordenes',
            icon: 'remove',
            route: PAGE_ROUTE.REPORT.ORDERS,
          },
        ],
      },
    ],
  },
];
