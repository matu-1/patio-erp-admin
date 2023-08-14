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
import { DetailDialog } from './components/detail/detail.dialog';
import { OrdersComponent } from './pages/orders/orders.component';
import { EditBankAccountDialog } from './components/edit-bank-account/edit-bank-account.dialog';
import { CollectMerchantComponent } from './pages/collect-merchant/collect-merchant.component';
import { InvoiceYearComponent } from './pages/invoice-year/invoice-year.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { DriverDetailComponent } from './pages/driver-detail/driver-detail.component';
import { DocumentBoxComponent } from './components/document-box/document-box.component';
import { OrdersCashComponent } from './pages/orders-cash/orders-cash.component';
import { DriverEarningsComponent } from './pages/driver-earnings/driver-earnings.component';
import { EarningsDetailDialog } from './components/earnings-detail/earnings-detail.dialog';

@NgModule({
  declarations: [
    PaymentDetailComponent,
    DeliveryDetailComponent,
    HoursWorkedComponent,
    OrdersReceivedComponent,
    DetailDialog,
    OrdersComponent,
    EditBankAccountDialog,
    CollectMerchantComponent,
    InvoiceYearComponent,
    DriversComponent,
    DriverDetailComponent,
    DocumentBoxComponent,
    OrdersCashComponent,
    DriverEarningsComponent,
    EarningsDetailDialog,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ComponentsModule,
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
})
export class ReportModule {}
