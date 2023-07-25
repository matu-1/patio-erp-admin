import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class InvoiceModule {}
