"use client";

import React, { useRef, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Save,
  X,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { updateUserInfo, updateUserPassword } from "@/services/udpateUserService";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { success } from "zod";

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false); 

  const nameInput=useRef<HTMLInputElement|null>(null)
  const emailInput=useRef<HTMLInputElement|null>(null)
  const phoneInput=useRef<HTMLInputElement|null>(null) 
  const currentPasswordInput=useRef<HTMLInputElement|null>(null)
  const newPasswordInput=useRef<HTMLInputElement|null>(null)
  const reNewPasswordInput=useRef<HTMLInputElement|null>(null) 
  const session =useSession() 
 

  async function setNewUserInfo(){  

    if (nameInput.current?.value&&emailInput.current?.value&&phoneInput.current?.value) {
      
      const data = await updateUserInfo(nameInput.current?.value,emailInput.current?.value,phoneInput.current?.value)  
      if (data.message=='fail') { 
        toast.error(data.errors.msg)
        
      } 
      if(data.message=='success'){ 
        toast.success("Data Updated Successfully You Must Login Again") 
        signOut({callbackUrl:'/login'})
      }
      console.log(data);
    }
      
    
  }
 
  async  function setNewUserPassword(){ 

    if(currentPasswordInput.current?.value&&newPasswordInput.current?.value&&reNewPasswordInput.current?.value){ 
      if (newPasswordInput.current?.value!=reNewPasswordInput.current?.value) {
        toast.error("New Password And RePassword Must Be The Same") 
      }else{ 
        const data = await updateUserPassword(currentPasswordInput?.current.value,newPasswordInput?.current.value,reNewPasswordInput?.current.value) 
        if (data.message=='fail'){ 
         toast.error(data.errors.msg)
        } 
        if (data.message=='success') {
          toast.success("Password Updated Successfully You Must Login Again") 
          signOut({callbackUrl:'/login'})
        }

      }
    }

   } 
  return (
    <main className="min-h-screen bg-[#FBF9F6] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
            <UserRound className="size-3.5" />
            Account Settings
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Settings
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
                Manage your personal information and keep your account details
                up to date.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">

          {/* Personal Information */}
          <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)]">

            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-5 sm:px-8">

              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-amber-400 shadow-sm">
                  <UserRound className="size-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-950">
                    Personal Information
                  </h2>

                  <p className="mt-0.5 text-xs text-stone-400">
                    Your account information
                  </p>
                </div>
              </div>

              {!isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="group h-9 rounded-xl border-stone-200 px-3 text-xs font-semibold transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                >
                  <Pencil className="size-3.5 transition-transform group-hover:-rotate-6" />
                  Edit
                </Button>
              )}
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">

              <div className="space-y-6">

                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Full name
                  </label>

                  <div className="group relative">
                    <UserRound
                      className="absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-amber-500"
                    />

                    <Input
                      id="name"
                      disabled={!isEditing} 
                      ref={nameInput}
                      defaultValue={ session.data?.user.name}
                      placeholder="Enter your full name"
                      className="h-12 rounded-xl border-stone-200 bg-stone-50/60 pl-10 text-sm shadow-none transition-all placeholder:text-stone-400 hover:border-stone-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 disabled:cursor-default disabled:opacity-70"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <Mail
                      className="absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-amber-500"
                    />

                    <Input
                      id="email" 
                     ref={emailInput}
                      disabled={!isEditing}
                      defaultValue={ session.data?.user.email}
                      type="email"
                      placeholder="Enter your email"
                      className="h-12 rounded-xl border-stone-200 bg-stone-50/60 pl-10 text-sm shadow-none transition-all placeholder:text-stone-400 hover:border-stone-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 disabled:cursor-default disabled:opacity-70"
                    />
                  </div>

                  <p className="px-1 text-xs text-stone-400">
                    This email is associated with your account.
                  </p>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Phone number
                  </label>

                  <div className="group relative">
                    <Phone
                      className="absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-amber-500"
                    />

                    <Input
                      id="phone" 
                      ref={phoneInput}
                      disabled={!isEditing}
                      defaultValue="01012455527"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="h-12 rounded-xl border-stone-200 bg-stone-50/60 pl-10 text-sm shadow-none transition-all placeholder:text-stone-400 hover:border-stone-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 disabled:cursor-default disabled:opacity-70"
                    />
                  </div>
                </div>

                {/* Actions */}
                {isEditing && (
                  <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:justify-end">

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="h-11 rounded-xl border-stone-200 px-5 font-semibold transition-all hover:bg-stone-50"
                    >
                      <X className="size-4" />
                      Cancel
                    </Button>

                    <Button
                      type="button"  
                      onClick={()=>setNewUserInfo()}

                      className="group h-11 rounded-xl bg-slate-950 px-5 font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl active:translate-y-0"
                    >
                      <Save className="size-4" />
                      Save changes
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>

                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="rounded-[2rem] border border-stone-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.2)]">

            <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:px-8">

              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <LockKeyhole className="size-5" />
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-slate-950">
                  Password & Security
                </h2>

                <p className="mt-1 text-xs text-stone-400">
                  Change your password to keep your account secure.
                </p>
              </div>

              {/* <Button
                type="button"
                variant="outline"
                className="group h-10 rounded-xl border-stone-200 px-4 text-xs font-semibold transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
              >
                Change password
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Button> */} 
       <Dialog>
  <form>
    <DialogTrigger
      render={
        <Button
          type="button"
          variant="outline"
          className="group h-10 rounded-xl border-stone-200 bg-white px-4 text-xs font-semibold text-stone-700 shadow-sm transition-all duration-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:shadow-md"
        >
          Change password
          <ArrowRight className="ml-1.5 size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      }
    />

    <DialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-white p-0 shadow-2xl">
      {/* Header */}
      <DialogHeader className="border-b border-stone-100 bg-gradient-to-br from-amber-50/80 via-white to-white px-6 pb-5 pt-6">
        <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shadow-sm">
          <LockKeyhole className="size-5" />
        </div>

        <DialogTitle className="font-serif text-2xl font-medium tracking-tight text-slate-900">
          Change password
        </DialogTitle>

        <DialogDescription className="mt-.5 max-w-sm text-xs leading-5 text-stone-500">
          Update your password to keep your account secure. Enter your current
          password and choose a new one.
        </DialogDescription>
      </DialogHeader>

      {/* Form */}
      <div className="space-y-5 px-6 py-6">
        {/* Current Password */}
        <Field>
          <Label
            htmlFor="currentPassword"
            className="mb-2 block text-xs font-semibold text-slate-700"
          >
            Current password
          </Label>

          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />

            <Input
              id="currentPassword"
              ref={currentPasswordInput}
              type="password"
              placeholder="Enter your current password"
              className="h-11 rounded-xl border-stone-200 bg-stone-50/50 pl-10 text-sm shadow-none transition-all placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </Field>

        {/* New Password */}
        <Field>
          <Label
            htmlFor="password"
            className="mb-2 block text-xs font-semibold text-slate-700"
          >
            New password
          </Label>

          <div className="relative">
            <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />

            <Input
              id="password"
              ref={newPasswordInput}
              type="password"
              placeholder="Enter your new password"
              className="h-11 rounded-xl border-stone-200 bg-stone-50/50 pl-10 text-sm shadow-none transition-all placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <p className="mt-1.5 text-[11px] text-stone-400">
            Choose a password that you don't use elsewhere.
          </p>
        </Field>

        {/* Confirm Password */}
        <Field>
          <Label
            htmlFor="rePassword"
            className="mb-2 block text-xs font-semibold text-slate-700"
          >
            Confirm new password
          </Label>

          <div className="relative">
            <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />

            <Input
              id="rePassword"
              ref={reNewPasswordInput}
              type="password"
              placeholder="Re-enter your new password"
              className="h-11 rounded-xl border-stone-200 bg-stone-50/50 pl-10 text-sm shadow-none transition-all placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </Field>
      </div>

      {/* Footer */}
      <DialogFooter className="flex flex-col-reverse gap-2 border-t mb-.5 border-stone-100 bg-stone-50/50 px-6 py-4 sm:flex-row sm:justify-end">
        <DialogClose
          render={
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-xl border-stone-200 bg-white px-5 text-xs font-semibold text-stone-600 transition-all hover:bg-stone-100 hover:text-stone-800"
            >
              Cancel
            </Button>
          }
        />

        <Button
          type="submit"
          onClick={() => setNewUserPassword()}
          className="h-10 rounded-xl bg-slate-900 px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-amber-700 hover:shadow-md"
        >
          Update password
          <ArrowRight className="ml-1.5 size-3.5" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </form>
</Dialog>
            </div>
          </section> 


 


  




       

         

        </div>
      </div>
    </main>
  );
}