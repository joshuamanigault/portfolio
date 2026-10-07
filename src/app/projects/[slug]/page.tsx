import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  projects,
  projectStories,
  formatProjectPeriod,
  getProjectSummary,
} from "@/data/projects";
import { ProjectToc } from "@/components/project-toc";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${slug}`,
      images: project.images,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) notFound();
  const story = projectStories[slug];
  const summary = getProjectSummary(project);
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <div className="container-main project-detail-page">
      <article className="project-reader">
        <ProjectToc key={slug} />
        <header className="project-title">
          <p className="project-kicker">
            {formatProjectPeriod(project)} · {summary.metric}
          </p>
          <h1>{project.title}</h1>
          <p>{summary.tagline}</p>
        </header>

        <figure
          className={`project-hero-image ${slug === "asu-professorview" ? "project-hero-logo" : ""}`}
        >
          <Image
            src={project.images[0]}
            alt={
              slug === "asu-professorview"
                ? "ASU ProfessorView's gold eye and graduation cap logo on a maroon background"
                : "ASL detection running with hand landmarks and a predicted digit in the webcam feed"
            }
            fill
            priority
            sizes="(min-width: 1440px) 896px, (min-width: 1181px) calc(100vw - 544px), (min-width: 768px) 720px, calc(100vw - 36px)"
          />
        </figure>

        <div className="project-body">
          <section aria-labelledby="about">
            <h2 id="about">About</h2>
            <p>{story?.about ?? project.description}</p>
            <p className="project-highlight">{project.highlight}</p>
          </section>
          <section aria-labelledby="how-it-works">
            <h2 id="how-it-works">How it works</h2>
            <ol>
              {(story?.steps ?? [project.description]).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="built-with">
            <h2 id="built-with">Built with</h2>
            <p>{story?.technology ?? `Built with ${project.techStack.join(", ")}.`}</p>
            <p className="project-tech">{project.techStack.join(" · ")}</p>
          </section>
          <section aria-labelledby="links">
            <h2 id="links">Links</h2>
            <ul className="project-resource-links">
              {project.githubUrl && (
                <li>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    Source code on GitHub
                  </a>
                </li>
              )}
              {project.liveUrl && (
                <li>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Get the Chrome extension
                  </a>
                </li>
              )}
            </ul>
          </section>
        </div>
        <nav className="project-pagination" aria-label="More projects">
          <Link href="/projects" className="nav-link">
            All projects
          </Link>
          {nextProject.slug !== slug && (
            <Link href={`/projects/${nextProject.slug}`} className="nav-link">
              Next: {nextProject.title}
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
