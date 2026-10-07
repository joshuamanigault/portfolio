import Image from "next/image";
import Link from "next/link";
import { getProjectSummary, formatProjectPeriod } from "@/data/projects";
import type { Project } from "@/data/types";

export function ProjectCard({ project }: { project: Project }) {
  const image = project.images[0];

  return (
    <article>
      <Link href={`/projects/${project.slug}`} className="project-entry">
        <div
          className={`project-cover ${project.slug === "asu-professorview" ? "project-cover-logo" : ""}`}
        >
          {image && (
            <Image
              src={image}
              alt={project.title}
              fill
              sizes="(max-width: 480px) calc(100vw - 36px), 240px"
            />
          )}
        </div>
        <div>
          <p className="project-kicker">
            {formatProjectPeriod(project)} · {getProjectSummary(project).metric}
          </p>
          <h2>{project.title}</h2>
          <p className="project-summary">{getProjectSummary(project).tagline}</p>
        </div>
      </Link>
    </article>
  );
}
