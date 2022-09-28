import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentQrRoutingModule } from './payment-qr-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PaymentQrRoutingModule,
    ComponentsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
})
export class PaymentQrModule {}
