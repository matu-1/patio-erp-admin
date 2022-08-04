import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomColumnDirective } from './custom-column.directive';

@NgModule({
  declarations: [CustomColumnDirective],
  imports: [CommonModule],
  exports: [CustomColumnDirective],
})
export class DirectivesModule {}
