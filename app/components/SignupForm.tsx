"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const formSchema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters")
      .max(32, "Name must be at most 32 characters"),

    email: z
      .string()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    role: z.enum(["admin", "user"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Create an account
        </CardTitle>

        <CardDescription className="text-center">
          Sign up to start using your Inventory & Sales System.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1"
        >
          {/* Name */}
          <FieldGroup>
            <label className="text-sm font-medium">
              Name
            </label>

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your name"
                  />

                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </FieldGroup>

          {/* Email */}
          <FieldGroup>
            <label className="text-sm font-medium">
              Email
            </label>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                  />

                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </FieldGroup>

          {/* Password */}
          <FieldGroup>
            <label className="text-sm font-medium">
              Password
            </label>

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </FieldGroup>

          {/* Confirm Password */}
          <FieldGroup>
            <label className="text-sm font-medium">
              Confirm Password
            </label>

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </FieldGroup>

          {/* Role */}
          <FieldGroup>
            <label className="text-sm font-medium">
              Role
            </label>

            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="user">
                        User
                      </SelectItem>

                      <SelectItem value="admin">
                        Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </FieldGroup>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </form>
      </CardContent>

      {/* Footer */}
      {/* <CardFooter className="flex justify-center gap-2">
        <CardDescription>
          Already have an account?
        </CardDescription>

        <Link href="/sign-in">
          <Button
            type="button"
            variant="link"
            className="cursor-pointer p-0"
          >
            Sign in
          </Button>
        </Link>
      </CardFooter> */}
    </Card>
  );
}





// "use client";

// import React from "react";
// import { z } from "zod";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { FieldGroup } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const signupFields = [
//   {
//     name: "name",
//     label: "Name",
//     type: "text",
//     placeholder: "Enter your name",
//   },
//   {
//     name: "email",
//     label: "Email",
//     type: "email",
//     placeholder: "Enter your email",
//   },
//   {
//     name: "password",
//     label: "Password",
//     type: "password",
//     placeholder: "Enter your password",
//   },
//   {
//     name: "confirmPassword",
//     label: "Confirm Password",
//     type: "password",
//     placeholder: "Confirm your password",
//   },
//   {
//     name: "role",
//     label: "Role",
//     type: "select",
//     placeholder: "Select role",
//     options: [
//       {
//         label: "User",
//         value: "user",
//       },
//       {
//         label: "Admin",
//         value: "admin",
//       },
//     ],
//   },
// ] as const;

// const formSchema = z
//   .object({
//     name: z
//       .string()
//       .min(5, "Name must be at least 5 characters")
//       .max(32, "Name must be at most 32 characters"),

//     email: z.string().email("Invalid email"),

//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters"),

//     confirmPassword: z
//       .string()
//       .min(8, "Password must be at least 8 characters"),

//     role: z.enum(["admin", "user"]),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type SignupFormValues = z.infer<typeof formSchema>;

// export default function SignupForm() {
//   const form = useForm<SignupFormValues>({
//     resolver: zodResolver(formSchema),

//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       role: "user",
//     },
//   });

//   const onSubmit = (data: SignupFormValues) => {
//     console.log(data);
//   };

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle>Create an account</CardTitle>

//         <CardDescription>
//           Sign up to start using your Inventory & Sales System.
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-5"
//         >
//           {signupFields.map((item) => (
//             <FieldGroup key={item.name}>
//               <label className="text-sm font-medium">
//                 {item.label}
//               </label>

//               <Controller
//                 name={item.name as keyof SignupFormValues}
//                 control={form.control}
//                 render={({ field, fieldState }) => {
//                   // Select
//                   if (item.type === "select") {
//                     return (
//                       <>
//                         <select
//                           {...field}
//                           value={field.value as string}
//                           className="w-full rounded-md border px-3 py-2 text-sm"
//                         >
//                           <option value="">
//                             {item.placeholder}
//                           </option>

//                           {item.options?.map((option) => (
//                             <option
//                               key={option.value}
//                               value={option.value}
//                             >
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>

//                         {fieldState.error && (
//                           <p className="text-sm text-red-500">
//                             {fieldState.error.message}
//                           </p>
//                         )}
//                       </>
//                     );
//                   }

//                   // Input
//                   return (
//                     <>
//                       <Input
//                         {...field}
//                         type={item.type}
//                         placeholder={item.placeholder}
//                       />

//                       {fieldState.error && (
//                         <p className="text-sm text-red-500">
//                           {fieldState.error.message}
//                         </p>
//                       )}
//                     </>
//                   );
//                 }}
//               />
//             </FieldGroup>
//           ))}

//           <Button
//             type="submit"
//             className="w-full"
//           >
//             Create Account
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

