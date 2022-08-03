import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: PAGE_ROUTE.AUTH.LOGIN_ROOT,
        component: LoginComponent,
      },
      {
        path: '**',
        redirectTo: PAGE_ROUTE.AUTH.LOGIN_ROOT,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
