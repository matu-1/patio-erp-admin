import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: PAGE_ROUTE.COLLECT_DRIVER.LIST_ROOT,
    component: ListComponent,
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.COLLECT_DRIVER.LIST_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectDriverRoutingModule {}
