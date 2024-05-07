import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { MerchantCommissionDetailComponent } from './pages/merchant-commission-detail/merchant-commission-detail.component';

const routes: Routes = [
  {
    path: PAGE_ROUTE.PUBLIC.INVOICE_DETAIL_ROOT,
    component: InvoiceDetailComponent,
  },
  {
    path: PAGE_ROUTE.PUBLIC.ORDER_TRACKING_ROOT,
    component: OrderTrackingComponent,
  },
  {
    path: PAGE_ROUTE.PUBLIC.MERCHANT_COMMISSION_DETAIL_ROOT,
    component: MerchantCommissionDetailComponent,
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.PUBLIC.INVOICE_DETAIL_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
