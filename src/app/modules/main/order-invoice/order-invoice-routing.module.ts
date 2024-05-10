import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';

const routes: Routes = [
  {
    path: PAGE_ROUTE.ORDER_INVOICE.LIST_ROOT,
    component: ListComponent,
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.ORDER_INVOICE.LIST_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderInvoiceRoutingModule {}
