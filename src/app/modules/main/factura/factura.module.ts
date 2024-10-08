import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RevertPaymentDialog } from './components/revert-payment/revert-payment.dialog';
import { PayDialog } from './components/pay/pay.dialog';
import { SchedulePaymentDialog } from './components/schedule-payment/schedule-payment.dialog';
import { EditDialog } from './components/edit/edit.dialog';
import { InvoiceDetailComponent } from '../../public/pages/invoice-detail/invoice-detail.component';

@NgModule({
  declarations: [
    ListComponent,
    RevertPaymentDialog,
    PayDialog,
    SchedulePaymentDialog,
    EditDialog,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    ComponentsModule,
    DirectivesModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ]
})
export class FacturaModule { }
