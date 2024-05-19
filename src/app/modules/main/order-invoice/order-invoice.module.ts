import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderInvoiceRoutingModule } from './order-invoice-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { RevertPaymentDialog } from './components/revert-payment/revert-payment.dialog';
import { PayDialog } from './components/pay/pay.dialog';
import { EditDialog } from './components/edit/edit.dialog';
import { SchedulePaymentDialog } from './components/schedule-payment/schedule-payment.dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ListComponent,
    RevertPaymentDialog,
    PayDialog,
    EditDialog,
    SchedulePaymentDialog,
  ],
  imports: [
    CommonModule,
    OrderInvoiceRoutingModule,
    ComponentsModule,
    MaterialModule,
    DirectivesModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class OrderInvoiceModule {}
