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
import { LoadingComponent } from './loading/loading.component';
import { CenterComponent } from './center/center.component';
import { ConfirmDialog } from './confirm/confirm.dialog';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    LoadingComponent,
    CenterComponent,
    ConfirmDialog,
    ButtonBarComponent,
    FormBuilderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
    AlertComponent,
    LoadingComponent,
    CenterComponent,
    ConfirmDialog,
    ButtonBarComponent,
    FormBuilderComponent,
  ],
})
export class ComponentsModule {}
