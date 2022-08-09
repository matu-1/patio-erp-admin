import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { MaterialModule } from '../modules/material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { ChipComponent } from './chip/chip.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { SimpleCardComponent } from './simple-card/simple-card.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DataTableComponent,
    SkeletonComponent,
    ChipComponent,
    TitleBarComponent,
    BreadcrumbsComponent,
    SimpleCardComponent,
    TextFieldComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    DataTableComponent,
    SkeletonComponent,
    ChipComponent,
    TitleBarComponent,
    BreadcrumbsComponent,
    SimpleCardComponent,
    TextFieldComponent,
  ],
})
export class ComponentsModule {}
