import { Component } from '@angular/core';
import { Breadcrumbs } from 'src/app/components/breadcrumbs/breadcrumbs.interface';
import { PAGE_ROUTE } from 'src/app/constants/page-route.constant';
import { PaymentDriverType } from '../../constants/payment-driver-type';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  title = 'Crear Pago';
  breadcrumbs: Breadcrumbs = [
    {
      path: PAGE_ROUTE.PAYMENT_DRIVER.LIST,
      title: 'Pagos Driver',
    },
    { path: '', title: this.title },
  ];
  type = PaymentDriverType.Pago;

  constructor() {}
}
