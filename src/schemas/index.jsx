import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters"),
    email: z.email("Invalid email").trim(),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters")
      .refine((val) => /[A-Z]/.test(val), {
        error: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        error: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /[@$!%*?]/.test(val), {
        message: "Password must contain at least one special character",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string(),

    // role: z.enum(["tenant", "landlord"], {
    //   errorMap: () => ({ message: "Role is required" }),
    // }),
    role: z.enum(["tenant", "landlord"], { message: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Enter an email").trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain  at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain  at least one lowercase letter",
    })
    .refine((val) => /[@$!%*?]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
});

export const verifyEmailSchema = z.object({
  email: z.email("Invalid email").trim(),
  verificationCode: z
    .string()
    .length(6, "Code must be 6 characters long.")
    .regex(/^\d+$/, "Code must contain only digits.")
    .trim(),
});

export const forgetPasswordSchema = z.object({
  email: z.email("Invalid email").trim(),
});

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email").trim(),
  passwordCode: z
    .string()
    .length(6, "Code must be 6 characters long.")
    .regex(/^\d+$/, "Code must contain only digits.")
    .trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[@$!%*?]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
});

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot exceed 20 characters"),
  // date: z.coerce
  //   .date()
  //   .min(new Date("1900-01-01"), "Date of birth must be after January 1, 1900")
  //   .max(new Date(), "Date of birth cannot be in the future"),
});

export const propertyValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name cannot exceed 10 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 20 characters")
    .max(500, "Description cannot exceed 500 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(20, "Location cannot exceed 20 characters"),
  furnishStatus: z.enum(["furnished", "unfurnished"], {
    errorMap: () => ({ message: "Furnish status is required" }),
  }),
  carpetArea: z.number().optional(),
  price: z.number().optional(),
  status: z.enum(["open", "closed"]).optional(),
  propertyImage: z
    .any()
    .nullable()
    .refine((val) => val instanceof File, {
      message: "Property image is required",
    }),
});
