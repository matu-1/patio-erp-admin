import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { CreateComponent } from './pages/create/create.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: PAGE_ROUTE.INVOICE.LIST_ROOT,
    component: ListComponent,
  },
  {
    path: PAGE_ROUTE.INVOICE.CREATE_ROOT,
    component: CreateComponent,
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.INVOICE.LIST_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
