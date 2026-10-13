"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resetCode } from "@/services/verifyCodeService";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Loader2Icon,
  ShieldCheck,
  MailCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyCode() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const router=useRouter()

  async function setCode() { 
   
    setIsLoading(true);

    const data = await resetCode(value);

    if (data.status=='Success') {
        router.push('/login/newpassword')
    }

   if (data.statusMsg == "fail") {
          toast.error(data.message);
        }
    

    console.log(data);

    setIsLoading(false);
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FBF9F6] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">

        <div className="w-full">

          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-2xl bg-amber-400/20 blur-xl" />

              <div className="relative flex size-16 items-center justify-center rounded-2xl bg-slate-950 shadow-lg shadow-slate-950/10">
                <MailCheck className="size-8 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.2)] sm:p-8">

            {/* Heading */}
            <div className="text-center">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                <ShieldCheck className="size-3.5" />
                Secure verification
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Verify your code
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-stone-500">
                Enter the 6-digit verification code that was sent to your
                email address.
              </p>
            </div>

            {/* OTP */}
            <div className="mt-9 flex justify-center">
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup className="gap-2 sm:gap-3">
                  {Array.from({ length: 6 }, (_, index) => index).map(
                    (index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="size-11 rounded-xl border border-stone-200 bg-stone-50/60 text-lg font-bold text-slate-950 shadow-none transition-all duration-200 data-[active=true]:border-amber-400 data-[active=true]:bg-white data-[active=true]:ring-4 data-[active=true]:ring-amber-500/10 sm:size-12"
                      />
                    )
                  )}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Status */}
            <div className="mt-5 min-h-6 text-center text-sm">
              {value === "" ? (
                <p className="text-stone-400">
                  Enter your 6-digit verification code
                </p>
              ) : (
                <p className="font-medium text-slate-700">
                  Code entered:{" "}
                  <span className="font-bold tracking-widest text-amber-600">
                    {value}
                  </span>
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              disabled={isLoading}
              onClick={() => setCode()}
              className="group mt-7 h-12 w-full rounded-xl bg-slate-950 font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify code
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Button>

            {/* Info */}
            <div className="mt-6 rounded-xl border border-stone-100 bg-stone-50/70 px-4 py-3 text-center">
              <p className="text-xs leading-5 text-stone-500">
                Didn&apos;t receive the code? Check your spam folder or make
                sure you entered the correct email.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-400">
            <ShieldCheck className="size-3.5 text-amber-500" />
            <span>Your verification is protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}