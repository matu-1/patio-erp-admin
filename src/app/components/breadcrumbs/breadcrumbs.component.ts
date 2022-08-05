import { Component, Input } from '@angular/core';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { Breadcrumbs } from './breadcrumbs.interface';

@Component({
  selector: 'app-breadcrumbs[breadcrumbs]',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  pageRoute = PAGE_ROUTE;
  @Input() breadcrumbs!: Breadcrumbs;

  constructor() {}
}
