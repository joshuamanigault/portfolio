import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectWithMeta } from "@/data/types";

interface ProjectCardProps {
  project: ProjectWithMeta;
  index?: number;
}

function formatProjectPeriod(project: ProjectWithMeta) {
  const [startYear, startMonth] = project.dates.started.split("-").map(Number);
  const started = new Date(startYear, startMonth - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (!project.dates.completed) {
    return "Started " + started;
  }

  const [completedYear, completedMonth] = project.dates.completed.split("-").map(Number);
  const completed = new Date(completedYear, completedMonth - 1, 1).toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );

  return started + " - " + completed;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const detailHref = "/projects/" + project.slug;

  return (
    <article
      className={cn(
        "group border-border grid gap-6 border-t py-8 md:grid-cols-[minmax(0,1fr)_13.5rem] md:items-start",
        "animate-slide-up opacity-0"
      )}
      style={{ animationDelay: String(index * 90) + "ms", animationFillMode: "forwards" }}
    >
      <div className="min-w-0">
        <div className="text-muted mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span>{formatProjectPeriod(project)}</span>
          {project.github && (
            <span className="inline-flex items-center gap-1.5">
              <Star size={13} aria-hidden="true" />
              {project.github.stars} {project.github.stars === 1 ? "star" : "stars"}
            </span>
          )}
        </div>

        <h2 className="text-foreground text-xl leading-tight font-semibold tracking-[-0.02em]">
          <Link
            href={detailHref}
            className="decoration-accent underline-offset-4 hover:underline"
          >
            {project.title}
          </Link>
        </h2>

        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {project.description}
        </p>
        <p className="text-foreground mt-4 text-sm font-medium">{project.highlight}</p>
        <p className="text-muted mt-3 text-xs leading-relaxed">
          {project.techStack.join(", ")}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <Link
            href={detailHref}
            className="text-foreground group inline-flex min-h-9 items-center gap-1.5 font-semibold whitespace-nowrap"
          >
            Read case study
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <Github size={15} aria-hidden="true" />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              Live project
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {project.images.length > 0 && (
        <Link
          href={detailHref}
          className="border-border bg-surface relative aspect-video overflow-hidden rounded-md border md:aspect-[4/3]"
          aria-label={"Read the " + project.title + " case study"}
        >
          <Image
            src={project.images[0]}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 767px) calc(100vw - 40px), 216px"
          />
        </Link>
      )}
    </article>
  );
}
