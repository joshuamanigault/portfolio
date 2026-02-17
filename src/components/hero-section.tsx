"use client";

import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="container-main flex min-h-[calc(100vh-60px)] items-center justify-center">
      <div
        className={cn(
          "max-w-[475px]",
          "animate-tilt",
          "origin-center"
        )}
      >
        <h1
          className={cn(
            "overflow-hidden whitespace-nowrap",
            "border-r-[0.15em] border-foreground",
            "text-[clamp(2rem,5vw,3.125rem)] font-semibold leading-tight",
            "tracking-[0.10em]",
            "animate-[fade-in_5.3s_ease-out,typing_4s_1.3s_steps(30,end)_forwards,blink-caret_0.75s_5.3s_step-end_infinite]"
          )}
        >
          Hello There...
        </h1>

        <h3
          className={cn(
            "text-[clamp(1.25rem,3vw,1.875rem)] font-bold",
            "opacity-0",
            "animate-slide-in",
            "[animation-delay:200ms]"
          )}
        >
          Software Engineer
        </h3>

        <p
          className={cn(
            "mt-5 mb-10 text-base leading-relaxed",
            "opacity-0",
            "animate-slide-in",
            "[animation-delay:500ms]"
          )}
        >
          I am an aspiring{" "}
          <span className="font-medium text-accent">Software Engineer</span>{" "}
          planning on majoring in Computer Science in the fall of 2024. I enjoy
          using critical thinking to solve problems I don&apos;t know the answer to.
        </p>
      </div>
    </section>
  );
}
