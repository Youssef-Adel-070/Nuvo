"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form" 
import {signIn} from "next-auth/react"

import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { formSchema } from "@/Helper/loginSchema"
import { useSearchParams } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import Link from "next/link"


type formFields=z.infer<typeof formSchema>
export function LoginForm() {  

    const [isLoading, setIsLoading] = React.useState<boolean>(false) 
    
    const serachParams=useSearchParams()
    const callbackUrl=serachParams.get('callback-url')
    const {handleSubmit,register,control,reset} = useForm<formFields>({
      defaultValues: {
          email: "",
          password: "",
        },
        resolver: zodResolver(formSchema),
  })

 async function onSubmit(data: formFields) { 
    setIsLoading(true)
     
   const response= await signIn("credentials",{  
    callbackUrl:callbackUrl?? '/',
    email:data.email,
    password:data.password, 
    redirect:true
   })  
   setIsLoading(false)
   console.log(response);
   
   
    
  }

  return (
   
<Card className="w-full sm:max-w-lg overflow-hidden border border-border/60 bg-background shadow-2xl">

  <CardContent className="p-8 sm:p-10">

    {/* Error */}
    {serachParams.get('error') && (
      <div className="mb-7 rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-4">
        <h1 className="text-sm font-medium leading-6 text-destructive text-center">
          {serachParams.get('error')}
        </h1>
      </div>
    )}

    {/* Header */}
    <div className="mb-10 text-center">

     

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Welcome Back
      </h1>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
        Sign in to your account and continue where you left off.
      </p>

    </div>

    <form
      id="form-rhf-demo"
      onSubmit={handleSubmit(onSubmit)}
    >

      <FieldGroup className="gap-7">

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-2.5"
            >

              <FieldLabel
                htmlFor="form-rhf-demo-title"
                className="text-sm font-semibold"
              >
                Email Address
              </FieldLabel>

              <Input
                {...field}
                type="email"
                placeholder="ali@example.com"
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="h-13 rounded-xl border-border/70 bg-muted/20 px-4 text-base shadow-sm transition-all placeholder:text-muted-foreground/60 focus-visible:bg-background focus-visible:ring-2"
              />

              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs"
                />
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
              className="gap-2.5"
            >

              <div className="flex items-center justify-between">

                <FieldLabel
                  htmlFor="form-rhf-demo-description"
                  className="text-sm font-semibold"
                >
                  Password
                </FieldLabel>

            <Link href='/login/forget-password'> 
                <button
                  type="button"
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                  Forgot password?
                </button>

                  </Link>
              </div>

              <Input
                {...field}
                type="password"
                placeholder="Enter your password"
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="h-13 rounded-xl border-border/70 bg-muted/20 px-4 text-base shadow-sm transition-all placeholder:text-muted-foreground/60 focus-visible:bg-background focus-visible:ring-2"
              />

              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="text-xs"
                />
              )}

            </Field>
          )}
        />

      </FieldGroup>

    </form>

  </CardContent>


  {/* Footer */}
  <CardFooter className="flex-col gap-6 border-t bg-muted/20 px-8 py-7 sm:px-10">

    <Field className="w-full flex-row gap-3">

      <Button
        type="button"
        variant="outline"
        onClick={() => reset()}
        className="h-12 flex-1 rounded-xl text-sm font-semibold transition-all hover:bg-background"
      >
        Reset
      </Button>

      <Button
        disabled={isLoading}
        type="submit"
        form="form-rhf-demo"
        className="h-12 flex-[1.5] rounded-xl text-sm font-semibold shadow-md transition-all"
      >
        {isLoading && (
          <Loader2Icon className="animate-spin" />
        )}

        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

    </Field>


    {/* Register */}
    <div className="text-center text-sm text-muted-foreground">

      Don`'`t have an account?{" "}

          <Link href={'/register'}>
      <span className="cursor-pointer font-semibold text-primary transition-colors hover:underline">
        Create account
      </span> 
      </Link>

    </div>

  </CardFooter>

</Card>


  )
}
