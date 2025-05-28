import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, initialValues } from "./schema";
import type { z } from "zod";
import { useAppCtxStore } from "@common/providers/app";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import FieldPassword from "@common/components/fields/password";
import { Divider } from "@heroui/divider";
import Input from "@common/components/fields/input";
import FieldFormError from "@common/components/fields/error";
import { Button } from "@heroui/button";
import { appName } from "@common/constants";
import { signIn } from "@common/actions/sign-in";
import { signUp } from "@common/actions/sign-up";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@common/constants/routes.ts";

interface Props {
  mode: "sign-in" | "sign-up";
}

const AuthRoute: FC<Props> = ({ mode }) => {
  const navigate = useNavigate();
  const { user_name, setAppData } = useAppCtxStore((state) => state);

  /**
   * Form
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialValues, username: user_name },
  });

  /**
   * Submit fn
   * @param values
   */
  const onSubmit = async (
    values: z.infer<typeof formSchema>,
  ): Promise<void> => {
    form.clearErrors();

    const { error, data } = await (mode === "sign-in"
      ? signIn(values.password)
      : signUp(values));

    if (error) {
      form.setError("root", { message: error });

      return;
    }

    if (data) {
      setAppData({ ...data.user_data, is_authenticated: true });
      navigate(ROUTES.dashboard);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="size-full grid place-content-center"
    >
      <Card className="min-w-[300px] md:min-w-[400px]">
        <CardHeader className="flex gap-1 items-center justify-between">
          <p className="flex gap-1 items-center">
            <img src="/icon-sq.svg" alt="logo" className="size-[20px]" />
            <span>{appName}</span>
          </p>
          <p className="text-sm">
            {mode === "sign-up" ? "New account" : "Account"}
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="grid gap-3">
          <Input
            inputProps={{
              label: "Username",
              size: "sm",
              labelPlacement: "outside",
              placeholder: "Enter your username",
              isDisabled: mode === "sign-in",
              isRequired: true,
            }}
            name="username"
            control={form.control}
          />
          <FieldPassword
            name="password"
            control={form.control}
            isGenerate={mode === "sign-up"}
            isCopy={mode === "sign-up"}
            inputProps={{
              label: "Password",
              size: "sm",
              labelPlacement: "outside",
              placeholder: "Enter your password",
            }}
          />
          <FieldFormError message={form.formState.errors.root?.message} />
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            color="primary"
            className="ml-auto"
            size="sm"
          >
            {mode === "sign-in" ? "Sign in" : "Create account"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AuthRoute;
