import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderInvoiceRoutingModule } from './order-invoice-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    OrderInvoiceRoutingModule,
    ComponentsModule,
  ]
})
export class OrderInvoiceModule { }
