import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    ComponentsModule,
    DirectivesModule,
    MaterialModule,
  ]
})
export class FacturaModule { }
