"use client";

import { Suspense } from "react";
import { Section } from "@/components/section";
import { ProjectGrid } from "@/components/project-grid";
import type { ProjectWithMeta } from "@/data/types";

interface ProjectsClientProps {
  projects: ProjectWithMeta[];
}

function ProjectsContent({ projects }: ProjectsClientProps) {
  return (
    <Section>
      <div className="mb-10">
        <h1 className="text-foreground text-3xl font-semibold tracking-[-0.03em]">
          Projects
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
          Selected software and research work, with notes on the decisions behind each
          build.
        </p>
      </div>

      <ProjectGrid projects={projects} />
    </Section>
  );
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  return (
    <Suspense
      fallback={
        <Section>
          <div className="text-muted py-20 text-center">Loading projects...</div>
        </Section>
      }
    >
      <ProjectsContent projects={projects} />
    </Suspense>
  );
}
