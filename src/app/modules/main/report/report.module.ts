import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { PaymentDetailComponent } from './pages/payment-detail/payment-detail.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [PaymentDetailComponent],
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
