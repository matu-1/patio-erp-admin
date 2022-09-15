import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: PAGE_ROUTE.CLIENT.LIST_ROOT,
    component: ListComponent,
  },
  {
    path: PAGE_ROUTE.CLIENT.EDIT_ROOT,
    component: EditComponent,
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.CLIENT.LIST_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
