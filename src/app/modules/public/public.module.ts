import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [OrderTrackingComponent],
  imports: [CommonModule, PublicRoutingModule, MaterialModule],
})
export class PublicModule {}
