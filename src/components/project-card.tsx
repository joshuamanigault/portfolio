import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Star, Clock } from "lucide-react";
import { TechBadge } from "@/components/tech-badge";
import { cn } from "@/lib/utils";
import type { ProjectWithMeta } from "@/data/types";

interface ProjectCardProps {
  project: ProjectWithMeta;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col",
        "border-border bg-card rounded-lg border",
        "transition-all duration-300",
        "hover:border-muted hover:-translate-y-0.5",
        "animate-slide-up opacity-0"
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
    >
      {/* Card image area */}
      <div className="bg-surface relative h-48 overflow-hidden rounded-t-lg">
        {project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-muted/30 text-4xl font-bold">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-foreground text-lg leading-tight font-semibold">
            {project.title}
          </h3>
          <Link
            href={`/projects/${project.slug}`}
            className="text-muted hover:text-foreground shrink-0 transition-colors"
            aria-label={`View ${project.title} details`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <p className="text-card-foreground mb-4 line-clamp-2 flex-1 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {project.techStack.length > 4 && (
            <span className="text-muted inline-flex items-center px-2 text-xs">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Footer: GitHub meta + links */}
        <div className="border-border flex items-center justify-between border-t pt-3">
          <div className="text-muted flex items-center gap-3 text-xs">
            {project.github && (
              <>
                <span className="flex items-center gap-1">
                  <Star size={12} />
                  {project.github.stars}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(project.github.lastUpdated).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
            {!project.github && project.dates.started && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {new Date(project.dates.started).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label={`${project.title} GitHub repository`}
              >
                <Github size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label={`${project.title} live site`}
              >
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Full card link overlay */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        tabIndex={-1}
        aria-hidden="true"
      >
        <span className="sr-only">View {project.title}</span>
      </Link>
    </article>
  );
}
