import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { PaymentDetailComponent } from './pages/payment-detail/payment-detail.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DeliveryDetailComponent } from './pages/delivery-detail/delivery-detail.component';
import { HoursWorkedComponent } from './pages/hours-worked/hours-worked.component';
import { OrdersReceivedComponent } from './pages/orders-received/orders-received.component';

@NgModule({
  declarations: [PaymentDetailComponent, DeliveryDetailComponent, HoursWorkedComponent, OrdersReceivedComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ComponentsModule,
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
})
export class ReportModule {}
