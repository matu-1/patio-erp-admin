import { FormControl, FormGroup } from '@angular/forms';
import { TextFieldSchema } from './text-field.interface';

export function buildform(textFieldSchema: TextFieldSchema) {
  const controls: any = {};
  textFieldSchema.forEach((value) => {
    controls[value.name] = new FormControl(
      value.value,
      value.validators?.map((validator) => validator.validatorFn)
    );
  });
  return new FormGroup(controls);
}
