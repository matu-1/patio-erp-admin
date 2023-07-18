import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectDriverRoutingModule } from './collect-driver-routing.module';
import { ListComponent } from './pages/list/list.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MaterialModule } from '../../material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PayDialog } from './components/pay/pay.dialog';
import { DriverInfoDialog } from './components/driver-info/driver-info.dialog';
import { CreateComponent } from './pages/create/create.component';
import { NewPaymentComponent } from './components/new-payment/new-payment,.component';
import { GeneratePrepaidComponent } from './pages/generate-prepaid/generate-prepaid.component';
import { DivideDialog } from './components/divide/divide.dialog';

@NgModule({
  declarations: [
    ListComponent,
    PayDialog,
    DriverInfoDialog,
    CreateComponent,
    NewPaymentComponent,
    GeneratePrepaidComponent,
    DivideDialog,
  ],
  imports: [
    CommonModule,
    CollectDriverRoutingModule,
    DirectivesModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [NewPaymentComponent],
})
export class CollectDriverModule {}
