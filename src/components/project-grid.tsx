import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/types";

interface ProjectGridProps {
  projects: Project[];
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
    <div className="project-entries">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
