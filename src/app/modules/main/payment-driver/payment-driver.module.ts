import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDriverRoutingModule } from './payment-driver-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '../../material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PayDialog } from './components/pay/pay.dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaymentDetailDialog } from './components/payment-detail/payment-detail.dialog';
import { CreateComponent } from './pages/create/create.component';
import { CollectDriverModule } from '../collect-driver/collect-driver.module';

@NgModule({
  declarations: [ListComponent, PayDialog, PaymentDetailDialog, CreateComponent],
  imports: [
    CommonModule,
    PaymentDriverRoutingModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CollectDriverModule,
  ],
})
export class PaymentDriverModule {}
