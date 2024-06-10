import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { MaterialModule } from '../material/material.module';
import { PayDialog } from './components/pay/pay.dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MerchantCommissionDetailComponent } from './pages/merchant-commission-detail/merchant-commission-detail.component';
import { OrderInvoiceDetailComponent } from './pages/order-invoice-detail/order-invoice-detail.component';
import { OrdersDetailDialog } from './components/orders-detail/orders-detail.dialog';

@NgModule({
  declarations: [
    OrderTrackingComponent,
    PayDialog,
    MerchantCommissionDetailComponent,
    OrderInvoiceDetailComponent,
    OrdersDetailDialog,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DirectivesModule,
  ],
})
export class PublicModule {}
