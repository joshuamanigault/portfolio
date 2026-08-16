import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, positioningStatement } from "@/data/site";
import { GitHubContributions } from "@/components/github-contributions";
import { Experience } from "@/components/experience";
import { cn } from "@/lib/utils";

const RESUME_URL =
  "https://drive.google.com/file/d/17sn8Upe6HyH85dfX2NMWna9Vzvx71nAK/view?usp=sharing";

export default async function HomePage() {
  return (
    <div className="container-main py-12 md:py-16">
      {/* Identity / Hero Section */}
      <header className="mb-16">
        {/* About Me heading */}
        <h1
          className={cn(
            "text-foreground mb-4 text-xl font-semibold",
            "animate-fade-in opacity-0"
          )}
          style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
        >
          Hi, I'm {siteConfig.name}
        </h1>

        <p
          className={cn(
            "text-muted flex items-center gap-2 text-sm",
            "animate-fade-in mb-4 opacity-0"
          )}
          style={{ animationDelay: "50ms", animationFillMode: "forwards" }}
        >
          <span className="status-dot"></span>
          prev swe intern @ Raytheon
        </p>

        <p
          className={cn(
            "text-muted-foreground max-w-2xl text-base leading-relaxed",
            "animate-fade-in mb-4 opacity-0"
          )}
          style={{ animationDelay: "50ms", animationFillMode: "forwards" }}
        >
          I love making videos surrounding CS content —&nbsp;
          <a
            href="https://www.tiktok.com/@joshdoescode"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground font-semibold underline transition-colors"
          >
            check it out
          </a>
        </p>

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

      {/* Experience Section */}
      <Experience />

      {/* GitHub Contributions */}
      <section
        className={cn("mb-16", "animate-fade-in opacity-0")}
        style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
      >
        <GitHubContributions />
      </section>

      {/* Resume CTA */}
      <section
        className={cn("flex justify-center", "animate-fade-in opacity-0")}
        style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
      >
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-card hover:bg-muted/50 text-foreground inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
        >
          Open Resume
        </a>
      </section>
    </div>
  );
}
