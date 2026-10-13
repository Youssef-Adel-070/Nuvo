import * as z from "zod"

export const registerSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .nonempty("Name is required"),

    email: z
      .string()
      .email("Invalid email")
      .nonempty("Email is required"),

    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
        "At least 5 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      ),

    rePassword: z
      .string()
      .nonempty("Please confirm your password"),

    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  }) .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>