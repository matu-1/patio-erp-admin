import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[customColumn]',
})
export class CustomColumnDirective {
  @Input('customColumn') field!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
