import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderInvoiceRoutingModule } from './order-invoice-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    OrderInvoiceRoutingModule,
    ComponentsModule,
    MaterialModule,
    DirectivesModule,
  ],
})
export class OrderInvoiceModule {}
