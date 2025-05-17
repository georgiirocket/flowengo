import { copyClipboard } from "@common/helpers/copy-clipboard.ts";
import { generatePassword } from "@common/helpers/genarate-password.ts";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import { MdGeneratingTokens } from "react-icons/md";

interface Props<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  isGenerate?: boolean;
  isCopy?: boolean;
  label?: string;
  placeholder?: string;
}

const FieldPassword = <TFormValues extends FieldValues>({
  name,
  control,
  isGenerate,
  isCopy,
  label = "Password",
  placeholder = "Enter your password",
}: Props<TFormValues>) => {
  const [isShow, setIsShow] = useState(false);

  const onToggle = () => setIsShow((prev) => !prev);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        return (
          <Input
            {...field}
            ref={field.ref}
            isRequired
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error?.message}
            isDisabled={formState.isSubmitting}
            label={label}
            labelPlacement="outside"
            placeholder={placeholder}
            type={isShow ? "text" : "password"}
            description={
              isGenerate && (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <div
                  className="ml-auto cursor-pointer transition-all hover:text-primaryColor"
                  onClick={() => {
                    field.onChange(generatePassword());
                    field.onBlur();
                  }}
                >
                  Generate password
                </div>
              )
            }
            endContent={
              <div className="flex items-center gap-1">
                {isShow && (
                  <Tooltip content="Hide password">
                    <IoEyeOffOutline
                      className="cursor-pointer size-[20px]"
                      onClick={onToggle}
                    />
                  </Tooltip>
                )}
                {!isShow && (
                  <Tooltip content="Show password">
                    <IoEyeOutline
                      className="cursor-pointer size-[20px]"
                      onClick={onToggle}
                    />
                  </Tooltip>
                )}
                {isCopy && (
                  <Tooltip content="Copy password">
                    <IoCopy
                      className="cursor-pointer size-[20px]"
                      onClick={() => {
                        void copyClipboard(field.value);
                      }}
                    />
                  </Tooltip>
                )}
                {isGenerate && (
                  <Tooltip content="Generate password">
                    <MdGeneratingTokens
                      className="cursor-pointer size-[20px]"
                      onClick={() => {
                        field.onChange(generatePassword());
                        field.onBlur();
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            }
          />
        );
      }}
    />
  );
};

export default FieldPassword;
