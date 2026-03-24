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
        <h1 className="text-muted mb-2 text-3xl font-medium">Projects</h1>
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
