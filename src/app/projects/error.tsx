"use client";

import { Section } from "@/components/section";

export default function ProjectsError({ reset }: { reset: () => void }) {
  return (
    <Section>
      <div className="border-border border-t pt-10">
        <h1 className="text-foreground text-2xl font-semibold">
          Projects could not be loaded
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
          The project list is temporarily unavailable. Try loading it again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="border-border bg-card text-foreground hover:bg-surface mt-6 rounded-md border px-4 py-2 text-sm font-semibold transition-colors active:scale-[0.98]"
        >
          Try again
        </button>
      </div>
    </Section>
  );
}
