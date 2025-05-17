import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, { message: "Username must be at les 20 characters." }),
  password: z.string().min(8, { message: "Shot password. Min 8 characters" }),
});

export const initialValues = {
  username: "",
  password: "",
};
