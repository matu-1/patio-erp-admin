import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTE } from './constants/page-route.constant';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: PAGE_ROUTE.AUTH.ROOT,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: PAGE_ROUTE.HOME_ROOT,
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: PAGE_ROUTE.AUTH.ROOT,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
