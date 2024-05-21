import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';

const routes: Routes = [
  {
    component: ListComponent,
    path: PAGE_ROUTE.MERCHANT_CLIENT.LIST_ROOT,
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.MERCHANT_CLIENT.LIST_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantClientRoutingModule {}
