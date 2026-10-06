import { ProjectGrid } from "@/components/project-grid";
import type { ProjectWithMeta } from "@/data/types";

export function ProjectsClient({ projects }: { projects: ProjectWithMeta[] }) {
  return (
    <section className="container-main projects-page">
      <header>
        <h1>Projects</h1>
        <p className="page-lead">Selected software and research work.</p>
      </header>
      <ProjectGrid projects={projects} />
    </section>
  );
}
