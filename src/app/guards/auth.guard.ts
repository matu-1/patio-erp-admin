import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';
import { PAGE_ROUTE } from '../constants/page-route.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.isValid();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isValid();
  }

  isValid() {
    return this.authService.isValid().pipe(
      tap((isValid) => {
        if (!isValid) this.router.navigateByUrl(PAGE_ROUTE.AUTH.LOGIN);
      })
    );
  }
}
