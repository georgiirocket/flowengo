import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@heroui/react";
import type { InputProps } from "@heroui/react";
import ErrorMessage from "@common/components/fields/error-message";

interface Props<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  inputProps?: InputProps;
}

const FieldInput = <TFormValues extends FieldValues>({
  control,
  name,
  inputProps,
}: Props<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        return (
          <Input
            {...inputProps}
            {...field}
            errorMessage={
              <ErrorMessage name={name} message={fieldState.error?.message} />
            }
            isInvalid={!!fieldState.error?.message}
            isDisabled={formState.isSubmitting}
            type="text"
          />
        );
      }}
    />
  );
};

export default FieldInput;
