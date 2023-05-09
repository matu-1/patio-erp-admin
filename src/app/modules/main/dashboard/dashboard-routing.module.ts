import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from '../../../constants/page-route.constant';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: PAGE_ROUTE.HOME_ROOT,
    component: MainComponent,
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.HOME_ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
