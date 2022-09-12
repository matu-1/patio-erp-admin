import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDriverRoutingModule } from './payment-driver-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '../../material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PaymentDriverRoutingModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
  ],
})
export class PaymentDriverModule {}
