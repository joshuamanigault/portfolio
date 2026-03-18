import { Github, Linkedin, Mail } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { enrichProjectsWithGitHub } from "@/lib/github";
import { siteConfig, positioningStatement } from "@/data/site";
import { ProjectGrid } from "@/components/project-grid";
import { GitHubContributions } from "@/components/github-contributions";
import { cn } from "@/lib/utils";

const RESUME_URL =
  "https://drive.google.com/file/d/17sn8Upe6HyH85dfX2NMWna9Vzvx71nAK/view?usp=sharing";

export default async function HomePage() {
  const featured = getFeaturedProjects();
  const featuredWithMeta = await enrichProjectsWithGitHub(featured);

  return (
    <div className="container-main py-12 md:py-16">
      {/* Identity / Hero Section */}
      <header className="mb-16">
        {/* About Me heading */}
        <h2
          className={cn(
            "text-foreground mb-4 text-xl font-semibold",
            "animate-fade-in opacity-0"
          )}
          style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
        >
          About Me
        </h2>

        {/* Positioning statement */}
        <p
          className={cn(
            "text-muted-foreground max-w-2xl text-base leading-relaxed",
            "animate-fade-in opacity-0"
          )}
          style={{ animationDelay: "50ms", animationFillMode: "forwards" }}
        >
          {positioningStatement}
        </p>

        {/* Social icons */}
        <div
          className={cn("mt-8 flex items-center gap-4", "animate-fade-in opacity-0")}
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href={siteConfig.socials.email}
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </div>
      </header>

      {/* GitHub Contributions */}
      <section
        className={cn("mb-16", "animate-fade-in opacity-0")}
        style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
      >
        <GitHubContributions />
      </section>

      {/* Featured Projects */}
      <section
        className={cn("mb-16", "animate-fade-in opacity-0")}
        style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
      >
        <h2 className="text-foreground mb-6 text-xl font-semibold">Featured Projects</h2>
        <ProjectGrid projects={featuredWithMeta} />
      </section>

      {/* Resume CTA */}
      <section
        className={cn("flex justify-center", "animate-fade-in opacity-0")}
        style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
      >
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-card hover:bg-muted/50 text-foreground inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
        >
          View Resume
        </a>
      </section>
    </div>
  );
}
