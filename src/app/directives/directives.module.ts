import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomColumnDirective } from './custom-column.directive';
import { MarkAllSubmitDirective } from './mark-all-submit.directive';
import { StopPropagationDirective } from './stop-propagation.directive';

@NgModule({
  declarations: [
    CustomColumnDirective,
    MarkAllSubmitDirective,
    StopPropagationDirective,
  ],
  imports: [CommonModule],
  exports: [
    CustomColumnDirective,
    MarkAllSubmitDirective,
    StopPropagationDirective,
  ],
})
export class DirectivesModule {}
