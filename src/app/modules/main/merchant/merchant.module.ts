import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ListComponent, EditComponent, CreateComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    DirectivesModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class MerchantModule {}
