"use client";

import React, { useRef, useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/services/forgetService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2Icon, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function ForgetPassword() {
  const emailInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function forgetPassCode() {
    setIsLoading(true);

    if (emailInput.current?.value) {
      const data = await forgotPassword(emailInput.current?.value);

      if (data.statusMsg == "success") {
        toast.success(data.message);
        setIsLoading(false);
        router.push("/login/verifycode");
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FBF9F6] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">

        <div className="w-full">
          {/* Top Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-950 shadow-lg shadow-slate-950/10">
              <ShieldCheck className="size-8 text-amber-400" />
            </div>
          </div>

          {/* Card */}
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.2)] sm:p-8">

            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Forgot your password?
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-stone-500">
                No worries. Enter your email address and we&apos;ll send you a
                verification code to reset your password.
              </p>
            </div>

            <Field className="space-y-2">
              <FieldLabel
                htmlFor="input-field-username"
                className="text-sm font-semibold text-slate-800"
              >
                Email address
              </FieldLabel>

              <div className="group relative">
                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400 transition-colors duration-200 group-focus-within:text-amber-500" />

                <Input
                  ref={emailInput}
                  id="input-field-username"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 rounded-xl border-stone-200 bg-stone-50/50 pl-10 text-sm shadow-none transition-all duration-200 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                />
              </div>

              <FieldDescription className="px-1 pt-1 text-xs text-stone-400">
                Make sure you enter the email associated with your account.
              </FieldDescription>
            </Field>

            <Button
              disabled={isLoading}
              onClick={() => forgetPassCode()}
              className="group mt-7 h-12 w-full rounded-xl bg-slate-950 font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                <>
                  Send verification code
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Button>

            {/* Security Note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="size-3.5 text-amber-500" />
              <span>Your account information is secure</span>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="mt-6 text-center text-xs text-stone-400">
            You&apos;ll receive a 6-digit verification code by email.
          </p>
        </div>
      </div>
    </div>
  );
}