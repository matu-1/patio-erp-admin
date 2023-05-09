import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from '../../material/material.module';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
})
export class DashboardModule {}
