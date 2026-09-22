import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Star, Clock, Calendar } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { fetchGitHubMeta } from "@/lib/github";
import { getProjectMDXContent } from "@/lib/mdx";
import { Section } from "@/components/section";
import { TechBadge } from "@/components/tech-badge";
import { Button } from "@/components/ui/button";
import { MDXContent } from "@/components/mdx-content";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatProjectMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: "/projects/" + project.slug,
    },
    openGraph: {
      title: `${project.title} | Joshua Manigault`,
      description: project.description,
      type: "article",
      url: "/projects/" + project.slug,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const githubMeta = project.githubUrl
    ? await fetchGitHubMeta(project.githubUrl)
    : undefined;

  const mdxContent = getProjectMDXContent(slug);

  return (
    <Section>
      {/* Back link */}
      <Link
        href="/projects"
        className="text-muted hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <div className="mb-10">
        <h1 className="text-foreground mb-4 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
          {project.title}
        </h1>

        <p className="text-card-foreground mb-6 max-w-2xl text-base leading-relaxed">
          {project.description}
        </p>

        {/* Meta row */}
        <div className="text-muted mb-6 flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            Started {formatProjectMonth(project.dates.started)}
          </span>
          {project.dates.completed && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Completed {formatProjectMonth(project.dates.completed)}
            </span>
          )}
          {githubMeta && (
            <>
              <span className="flex items-center gap-1.5">
                <Star size={14} />
                {githubMeta.stars} star{githubMeta.stars !== 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                Last updated{" "}
                {new Date(githubMeta.lastUpdated).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <Button href={project.githubUrl} external variant="secondary" size="sm">
              <Github size={16} />
              View Source
            </Button>
          )}
          {project.liveUrl && (
            <Button href={project.liveUrl} external variant="primary" size="sm">
              <ExternalLink size={16} />
              Live Demo
            </Button>
          )}
        </div>
      </div>

      {project.images.length > 0 && (
        <div className="border-border mb-10 overflow-hidden rounded-md border">
          <div className="bg-surface relative aspect-video">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 850px"
              priority
            />
          </div>
        </div>
      )}

      <div className="border-border mb-12 grid gap-10 border-t pt-10 md:grid-cols-[minmax(0,1.35fr)_minmax(13rem,0.65fr)]">
        <section>
          <h2 className="text-foreground text-lg font-semibold">Project overview</h2>
          <p className="text-muted-foreground mt-3 text-[15px] leading-7">
            {project.longDescription}
          </p>
        </section>
        <section>
          <h2 className="text-foreground text-lg font-semibold">Technology</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </section>
      </div>

      {mdxContent && (
        <div className="border-border mb-10 border-t pt-10">
          <h2 className="text-foreground mb-6 text-xl font-semibold">Case study</h2>
          <MDXContent source={mdxContent.content} />
        </div>
      )}
    </Section>
  );
}
