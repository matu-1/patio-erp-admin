import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomColumnDirective } from './custom-column.directive';
import { MarkAllSubmitDirective } from './mark-all-submit.directive';

@NgModule({
  declarations: [CustomColumnDirective, MarkAllSubmitDirective],
  imports: [CommonModule],
  exports: [CustomColumnDirective, MarkAllSubmitDirective],
})
export class DirectivesModule {}
