import { Component, OnInit } from '@angular/core';
import { paySchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.dialog.html',
})
export class PayDialog implements OnInit {
  paySchema = paySchema;
  form = buildform(paySchema);

  constructor() {}

  ngOnInit(): void {}

  save() {}
}
