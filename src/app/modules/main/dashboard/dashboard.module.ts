import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, DashboardRoutingModule, ComponentsModule],
})
export class DashboardModule {}
