import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomColumnDirective } from './custom-column.directive';
import { MarkAllSubmitDirective } from './mark-all-submit.directive';
import { StopPropagationDirective } from './stop-propagation.directive';
import { ImgLoadingDirective } from './img-loading.directive';

@NgModule({
  declarations: [
    CustomColumnDirective,
    MarkAllSubmitDirective,
    StopPropagationDirective,
    ImgLoadingDirective,
  ],
  imports: [CommonModule],
  exports: [
    CustomColumnDirective,
    MarkAllSubmitDirective,
    StopPropagationDirective,
    ImgLoadingDirective
  ],
})
export class DirectivesModule {}
