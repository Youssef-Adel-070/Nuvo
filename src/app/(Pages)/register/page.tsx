'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RegisterFormData, registerSchema } from '@/Helper/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { Params } from 'next/dist/server/request/params'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function Register({searchParams}:{searchParams:Params}) {   

  const [isLoading, setIsLoading] = useState(false) 
  const [error, setError] = useState('') 
  const router=useRouter()

  const {handleSubmit,control,reset}=useForm<RegisterFormData>({ 
    defaultValues:{ 
      name:'', 
      email:'', 
      phone:'', 
      password:'', 
      rePassword:'', 

    }, 
    resolver:zodResolver(registerSchema)
  }) 

  async function onSubmit(formData:RegisterFormData){ 
 
    setIsLoading(true) 
 
    try {
      const response= await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{ 
        method:"POST", 
        body:JSON.stringify(formData),
        headers:{ 
          "Content-Type":"application/json"
        }
      })  
      const data =await response.json()  
      if(data.message=='success'){ 
          router.push('/login')
      }
      
      console.log(data); 
    }catch (error) {
      console.log(error,"from Errro");  
      
      setError("Account Already Exists")
      
    }finally{
    setIsLoading(false)
    }
  }

  return ( 

<div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-muted/30 px-4 py-10 sm:py-14">
  {/* Background decoration */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
  </div>

  <div className="relative flex min-h-full flex-col items-center justify-center gap-6">
    {/* Header */}
   

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Create your account
      </h1>

      <p className="mt-1 max-w-md text-sm text-muted-foreground sm:text-base">
        Join us today and start enjoying a better shopping experience.
      </p>
    

    <Card className="w-full max-w-lg border-border/60 bg-background/95 shadow-xl shadow-black/5 backdrop-blur">
      <CardHeader className="space-y-2 border-b px-6 pb-6 sm:px-8">
        <CardTitle className="text-xl font-semibold">
          Personal Information
        </CardTitle>

        <CardDescription>
          Fill in your details below to create your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pt-6 sm:px-8">
        {/*
        {searchParams.get("error") && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">
                {searchParams.get("error")}
              </p>
            </div>
          </div>
        )}
        */}

        <form
          id="register-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-5">

            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2"
                >
                  <FieldLabel
                    htmlFor="register-name"
                    className="text-sm font-medium"
                  >
                    Full Name
                  </FieldLabel>

                  <Input
                    {...field}
                    id="register-name"
                    type="text"
                    placeholder="Ahmed Abd Al-Muti"
                    aria-invalid={fieldState.invalid}
                    autoComplete="name"
                    className="h-11 bg-background transition-all focus-visible:ring-2"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2"
                >
                  <FieldLabel
                    htmlFor="register-email"
                    className="text-sm font-medium"
                  >
                    Email Address
                  </FieldLabel>

                  <Input
                    {...field}
                    id="register-email"
                    type="email"
                    placeholder="ahmed@example.com"
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                    className="h-11 bg-background transition-all focus-visible:ring-2"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2"
                >
                  <FieldLabel
                    htmlFor="register-phone"
                    className="text-sm font-medium"
                  >
                    Phone Number
                  </FieldLabel>

                  <Input
                    {...field}
                    id="register-phone"
                    type="tel"
                    placeholder="01010700701"
                    aria-invalid={fieldState.invalid}
                    autoComplete="tel"
                    className="h-11 bg-background transition-all focus-visible:ring-2"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2"
                >
                  <FieldLabel
                    htmlFor="register-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    className="h-11 bg-background transition-all focus-visible:ring-2"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2"
                >
                  <FieldLabel
                    htmlFor="register-rePassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="register-rePassword"
                    type="password"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    className="h-11 bg-background transition-all focus-visible:ring-2"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-t bg-muted/20 px-6 py-6 sm:px-8">

        <Field className="w-full">
          <Button
            disabled={isLoading}
            type="submit"
            form="register-form"
            className="h-11 w-full text-sm font-semibold shadow-sm transition-all hover:shadow-md"
          >
            {isLoading && (
              <Loader2Icon className="mr-2 animate-spin" />
            )}

            {isLoading
              ? "Creating account..."
              : "Create Account"}
          </Button>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              Login
            </Link>
          </p>
        </Field>

        {error ? (
          <div className="w-full rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
            <p className="text-center text-sm font-medium text-destructive">
              {error}
            </p>
          </div>
        ) : null}

      </CardFooter>
    </Card>

    <p className="text-center text-xs text-muted-foreground">
      By creating an account, you agree to our terms and conditions.
    </p>
  </div>
</div>


      )
}
