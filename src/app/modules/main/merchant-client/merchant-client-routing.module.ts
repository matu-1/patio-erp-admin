import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {
    component: ListComponent,
    path: PAGE_ROUTE.MERCHANT_CLIENT.LIST_ROOT,
  },
  {
    component: CreateComponent,
    path: PAGE_ROUTE.MERCHANT_CLIENT.CREATE_ROOT,
  },
  {
    component: EditComponent,
    path: PAGE_ROUTE.MERCHANT_CLIENT.EDIT_ROOT,
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
