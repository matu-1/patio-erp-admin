import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule],
})
export class MainModule {}
