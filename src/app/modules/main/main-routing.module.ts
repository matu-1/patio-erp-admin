import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PAGE_ROUTE } from '../../constants/page-route.constant';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: PAGE_ROUTE.INVOICE.ROOT,
        loadChildren: () =>
          import('./factura/factura.module').then((m) => m.FacturaModule),
      },
      {
        path: PAGE_ROUTE.REPORT.ROOT,
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },
      {
        path: PAGE_ROUTE.PAYMENT_DRIVER.ROOT,
        loadChildren: () =>
          import('./payment-driver/payment-driver.module').then(
            (m) => m.PaymentDriverModule
          ),
      },
      {
        path: PAGE_ROUTE.CLIENT.ROOT,
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientModule),
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
