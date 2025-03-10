import { z } from "zod"

// Define zod schemas for data validation.
export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid e-mail address." }).nonempty({ message: "E-mail is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }).nonempty({ message: "Password is required." })
})

export const registerFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid e-mail address." }).nonempty({ message: "E-mail is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }).nonempty({ message: "Password is required." }),
  confirmPassword: z.string()
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })