import { FormControl, FormGroup } from '@angular/forms';
import { TextFieldSchema } from './text-field.interface';

export function buildform(textFieldSchema: TextFieldSchema) {
  const controls: any = {};
  textFieldSchema.forEach((item) => {
    controls[item.name] = new FormControl(
      { value: item.value, disabled: Boolean(item.disabled) },
      item.validators?.map((validator) => validator.validatorFn)
    );
  });
  return new FormGroup(controls);
}
