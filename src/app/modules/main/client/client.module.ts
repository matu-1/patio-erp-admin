import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateComponent } from './pages/create/create.component';

@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ComponentsModule,
    MaterialModule,
    DirectivesModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class ClientModule { }
