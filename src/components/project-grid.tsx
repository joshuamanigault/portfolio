import { ProjectCard } from "@/components/project-card";
import type { ProjectWithMeta } from "@/data/types";

interface ProjectGridProps {
  projects: ProjectWithMeta[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted text-lg">Projects are on the way.</p>
        <p className="text-card-foreground mt-1 text-sm">
          Check back soon to explore new builds.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
