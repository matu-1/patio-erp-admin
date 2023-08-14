import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { CollectMerchantComponent } from './pages/collect-merchant/collect-merchant.component';
import { DeliveryDetailComponent } from './pages/delivery-detail/delivery-detail.component';
import { HoursWorkedComponent } from './pages/hours-worked/hours-worked.component';
import { InvoiceYearComponent } from './pages/invoice-year/invoice-year.component';
import { OrdersReceivedComponent } from './pages/orders-received/orders-received.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentDetailComponent } from './pages/payment-detail/payment-detail.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { DriverDetailComponent } from './pages/driver-detail/driver-detail.component';
import { OrdersCashComponent } from './pages/orders-cash/orders-cash.component';
import { DriverEarningsComponent } from './pages/driver-earnings/driver-earnings.component';

const routes: Routes = [
  {
    path: PAGE_ROUTE.REPORT.PAYMENT_DETAIL_ROOT,
    component: PaymentDetailComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.DELIVERY_DETAIL_ROOT,
    component: DeliveryDetailComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.HOURS_WORKED_ROOT,
    component: HoursWorkedComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.ORDERS_RECEIVED_ROOT,
    component: OrdersReceivedComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.ORDERS_ROOT,
    component: OrdersComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.COLLECT_MERCHANT_ROOT,
    component: CollectMerchantComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.INVOICES_BY_YEAR_ROOT,
    component: InvoiceYearComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.DRIVERS_ROOT,
    component: DriversComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.DRIVER_DETAIL_ROOT,
    component: DriverDetailComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.ORDERS_CASH_ROOT,
    component: OrdersCashComponent,
  },
  {
    path: PAGE_ROUTE.REPORT.DRIVER_EARNINGS_ROOT,
    component: DriverEarningsComponent,
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.REPORT.PAYMENT_DETAIL_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
