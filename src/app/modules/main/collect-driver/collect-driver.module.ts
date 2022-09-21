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

@NgModule({
  declarations: [ListComponent,PayDialog],
  imports: [
    CommonModule,
    CollectDriverRoutingModule,
    DirectivesModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
})
export class CollectDriverModule {}
