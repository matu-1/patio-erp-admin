import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { MaterialModule } from '../modules/material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { SkeletonComponent } from './skeleton/skeleton.component';

@NgModule({
  declarations: [DataTableComponent, SkeletonComponent],
  imports: [CommonModule, MaterialModule, DirectivesModule],
  exports: [DataTableComponent, SkeletonComponent],
})
export class ComponentsModule {}
