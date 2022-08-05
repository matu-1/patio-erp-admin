import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MENU } from './layout.constant';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../auth/services/auth.service';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  menu = MENU;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  closeIfIsMobile(sidenav: MatSidenav) {
    if (this.mobileQuery.matches) sidenav.toggle();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl(PAGE_ROUTE.AUTH.LOGIN);
  }

  get user() {
    return this.authService.user;
  }
}
