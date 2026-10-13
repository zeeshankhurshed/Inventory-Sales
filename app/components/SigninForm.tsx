
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const signinFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    required: true,
  },
] as const;

const formSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

type SigninFormValues = z.infer<typeof formSchema>;

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SigninFormValues) => {
    console.log(data);
  };

  return (
    <Card className="w-full max-w-md  mx-auto mt-16">
      {/* Header */}
      <CardHeader>
        <CardTitle className="font-bold text-center">Sign in to your account</CardTitle>

        <CardDescription>
          Enter your email and password to sign in.
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {signinFields.map((item) => {
            const error = form.formState.errors[item.name];

            return (
              <div key={item.name} className="space-y-2">
                <label
                  htmlFor={item.name}
                  className="text-sm font-medium"
                >
                  {item.label}
                </label>

                {/* Password */}
                {item.name === "password" ? (
                  <div className="relative">
                    <Input
                      id={item.name}
                      {...form.register(item.name)}
                      type={showPassword ? "text" : "password"}
                      placeholder={item.placeholder}
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
                ) : (
                  /* Email */
                  <Input
                    id={item.name}
                    {...form.register(item.name)}
                    type={item.type}
                    placeholder={item.placeholder}
                  />
                )}

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-500">
                    {error.message}
                  </p>
                )}
              </div>
            );
          })}

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />

              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Signing in..."
              : "Sign in"}
          </Button>
        </form>
      </CardContent>

      {/* Footer */}
      {/* <CardFooter className="justify-center gap-1">
        <CardDescription>
          Don't have an account?
        </CardDescription>

        <Link
          href="/sign-up"
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Sign up
        </Link>
      </CardFooter> */}
    </Card>
  );
}

