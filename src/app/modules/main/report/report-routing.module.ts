import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { DeliveryDetailComponent } from './pages/delivery-detail/delivery-detail.component';
import { HoursWorkedComponent } from './pages/hours-worked/hours-worked.component';
import { PaymentDetailComponent } from './pages/payment-detail/payment-detail.component';

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
    path: '**',
    redirectTo: PAGE_ROUTE.REPORT.PAYMENT_DETAIL_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
