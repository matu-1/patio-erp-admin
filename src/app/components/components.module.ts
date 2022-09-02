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
import { BackdropComponent } from './backdrop/backdrop.component';
import { ProgressDialogComponent } from './progress-dialog/progress-dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ProgressBarDialogComponent } from './progress-bar-dialog/progress-bar-dialog.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    DataTableComponent,
    SkeletonComponent,
    ChipComponent,
    TitleBarComponent,
    BreadcrumbsComponent,
    SimpleCardComponent,
    TextFieldComponent,
    BackdropComponent,
    ProgressDialogComponent,
    SnackBarComponent,
    ProgressBarDialogComponent,
    AlertComponent,
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
    BackdropComponent,
    ProgressDialogComponent,
    ProgressBarDialogComponent,
    AlertComponent
  ],
})
export class ComponentsModule {}
