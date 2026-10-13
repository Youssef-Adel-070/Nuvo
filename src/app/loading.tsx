import { Loader2Icon } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <>
      {/* <div className="h-screen bg-blue-300 flex justify-center items-center"> 

            <p className='flex items-center gap-2'> <Loader2Icon className='animate-spin'/> Loading... </p>
        </div> */}
      <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-background">
        {" "}
        {/* Ambient background */}{" "}
        <div className="absolute inset-0">
          {" "}
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />{" "}
          <div className="absolute left-[20%] top-[25%] h-2 w-2 rounded-full bg-primary/40 animate-ping" />{" "}
          <div className="absolute right-[20%] top-[35%] h-2 w-2 rounded-full bg-primary/30 animate-ping [animation-delay:700ms]" />{" "}
          <div className="absolute bottom-[25%] left-[30%] h-1.5 w-1.5 rounded-full bg-primary/30 animate-ping [animation-delay:1000ms]" />{" "}
          <div className="absolute bottom-[30%] right-[25%] h-1.5 w-1.5 rounded-full bg-primary/40 animate-ping [animation-delay:500ms]" />{" "}
        </div>{" "}
        {/* Loader */}{" "}
        <div className="relative z-10 flex flex-col items-center">
          {" "}
          {/* Orbital animation */}{" "}
          <div className="relative mb-10 h-32 w-32">
            {" "}
            {/* Outer circle */}{" "}
            <div className="absolute inset-0 rounded-full border border-primary/10" />{" "}
            {/* Rotating orbit */}{" "}
            <div className="absolute inset-3 animate-spin rounded-full border border-transparent border-t-primary/60 border-r-primary/20 [animation-duration:2.5s]" />{" "}
            {/* Reverse orbit */}{" "}
            <div className="absolute inset-7 animate-spin rounded-full border border-transparent border-b-primary/70 border-l-primary/20 [animation-direction:reverse] [animation-duration:1.8s]" />{" "}
            {/* Center glow */}{" "}
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-xl animate-pulse" />{" "}
            {/* Center */}{" "}
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-background shadow-lg">
              {" "}
              <div className="h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))] animate-pulse" />{" "}
            </div>{" "}
            {/* Orbiting dots */}{" "}
            <div className="absolute inset-0 animate-spin [animation-duration:3s]">
              {" "}
              <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/40" />{" "}
            </div>{" "}
            <div className="absolute inset-0 animate-spin [animation-duration:4s] [animation-direction:reverse]">
              {" "}
              <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/60" />{" "}
            </div>{" "}
          </div>{" "}
          {/* Text */}{" "}
          <div className="text-center">
            {" "}
            <h1 className="text-2xl font-bold tracking-tight"> Nuvo </h1>{" "}
            <div className="mt-3 flex items-center justify-center gap-2">
              {" "}
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />{" "}
              <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:-0.15s]" />{" "}
              <span className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" />{" "}
            </div>{" "}
            <p className="mt-3 text-sm text-muted-foreground">
              {" "}
              Getting things ready...{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Bottom text */}{" "}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          {" "}
          <p className="text-xs text-muted-foreground/50">
            {" "}
            Please wait a moment{" "}
          </p>{" "}
        </div>{" "}
      </div>
    </>
  );
}
