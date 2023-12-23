import { Validators } from "@angular/forms";
import { TextFieldSchema } from "src/app/components/text-field/text-field.interface";
import { CustomValidators } from "src/app/utils/validators";

export const paySchema: TextFieldSchema = [
  {
    name: 'amount',
    label: 'Custom Amount',
    validators: [
      {
        name: 'required',
        message: 'Is required',
        validatorFn: Validators.required,
      },
      {
        name: 'number',
        message: 'Must be a number',
        validatorFn: CustomValidators.number,
      },
    ],
    df: "100%"
  },
];
