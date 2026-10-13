"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetNewPassword } from "@/services/resetpassword";
import {
  ArrowRight,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast from "react-hot-toast";

export default function NewPassword() {
  const emailInput = useRef<HTMLInputElement | null>(null);
  const newPasswordInput = useRef<HTMLInputElement | null>(null);   
  const router=useRouter()


  async function resetNewInputValues(){  

     if (emailInput.current?.value&&newPasswordInput.current?.value) {
                        
         const data= await resetNewPassword(emailInput.current?.value,newPasswordInput.current?.value) 

         if(data.token){ 
            router.push('/login')
         } 
         if(data.statusMsg=='fail'){ 
            toast.error(data.message)
         }
         console.log(data);

        }  
         

    } 



   

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FBF9F6] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[75vh] max-w-lg items-center justify-center">
        <div className="w-full">

          {/* Card */}
          <div className="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.2)] sm:p-6">

            {/* Header */}
            <div className="relative mb-7 overflow-hidden rounded-[1.5rem] bg-slate-950 px-6 py-8 text-center sm:px-8 sm:py-9">

              {/* Background decoration */}
              <KeyRound
                className="absolute -right-7 -top-10 size-44 rotate-12 text-white/[0.045]"
                strokeWidth={1}
              />

              <KeyRound
                className="absolute -bottom-12 -left-8 size-36 -rotate-12 text-amber-400/[0.05]"
                strokeWidth={1}
              />

              <div className="absolute -left-10 top-1/2 size-32 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />

              <div className="absolute -right-10 top-0 size-32 rounded-full bg-amber-400/10 blur-3xl" />

              {/* Header content */}
              <div className="relative z-10">

                {/* Icon */}
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 shadow-[0_0_30px_rgba(245,158,11,0.08)]">
                  <KeyRound className="size-7 text-amber-400" />
                </div>


                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Reset your password
                </h1>

               
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5 px-1 sm:px-2">

              {/* Email */}
              <Field className="space-y-2">
                <FieldLabel
                  htmlFor="input-field-email"
                  className="text-sm font-semibold text-slate-800"
                >
                  Email address
                </FieldLabel>

                <div className="group relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-stone-400 transition-colors duration-200 group-focus-within:text-amber-500"
                  />

                  <Input
                    ref={emailInput}
                    id="input-field-email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 rounded-xl border-stone-200 bg-stone-50/60 pl-10 text-sm text-slate-900 shadow-none transition-all duration-200 placeholder:text-stone-400 hover:border-stone-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>
              </Field>

              {/* New Password */}
              <Field className="space-y-2">
                <FieldLabel
                  htmlFor="input-field-password"
                  className="text-sm font-semibold text-slate-800"
                >
                  New password
                </FieldLabel>

                <div className="group relative">
                  <LockKeyhole
                    className="absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-stone-400 transition-colors duration-200 group-focus-within:text-amber-500"
                  />

                  <Input
                    ref={newPasswordInput}
                    id="input-field-password"
                    type="password"
                    placeholder="Enter your new password"
                    className="h-12 rounded-xl border-stone-200 bg-stone-50/60 pl-10 text-sm text-slate-900 shadow-none transition-all duration-200 placeholder:text-stone-400 hover:border-stone-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                  />
                </div>

                <p className="px-1 text-xs leading-5 text-stone-400">
                  Choose a strong password you haven&apos;t used before.
                </p>
              </Field>

              {/* Password Requirements */}
              <div className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-amber-100">
                    <LockKeyhole className="size-3.5 text-amber-600" />
                  </div>

                  <p className="text-xs font-bold text-slate-800">
                    Password requirements
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] text-amber-600">
                      ✓
                    </span>
                    At least 6 characters
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] text-amber-600">
                      ✓
                    </span>
                    Upper & lowercase
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] text-amber-600">
                      ✓
                    </span>
                    At least one number
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] text-amber-600">
                      ✓
                    </span>
                    Avoid common passwords
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button" 
                onClick={()=>resetNewInputValues()}
                    
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl active:translate-y-0"
              >
                Reset password

                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

           
          </div>

        
        </div>
      </div>
    </div>
  );
}