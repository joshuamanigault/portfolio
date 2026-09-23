import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, positioningStatement } from "@/data/site";
import { GitHubContributions } from "@/components/github-contributions";
import { Experience } from "@/components/experience";
import { ResumeLink } from "@/components/resume-link";
import { cn } from "@/lib/utils";

const RESUME_URL =
  "https://drive.google.com/file/d/1iWdY37mxMjlfx-IMbYnPiJIDkQcx3fC_/view?usp=sharing";

export default async function HomePage() {
  return (
    <div className="container-main py-12 md:py-16">
      {/* Identity / Hero Section */}
      <header className="mb-16">
        <h1
          className={cn(
            "text-foreground mb-4 text-2xl font-semibold tracking-[-0.02em]",
            "animate-fade-in opacity-0"
          )}
          style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
        >
          Hi, I&apos;m {siteConfig.name}
        </h1>

        <p
          className={cn("text-muted text-sm", "animate-fade-in mb-4 opacity-0")}
          style={{ animationDelay: "50ms", animationFillMode: "forwards" }}
        >
          Student Researcher at The Luminosity Lab
        </p>

        <p
          className={cn(
            "text-muted-foreground max-w-2xl text-base leading-relaxed",
            "animate-fade-in opacity-0"
          )}
          style={{ animationDelay: "50ms", animationFillMode: "forwards" }}
        >
          {positioningStatement} I also{" "}
          <a
            href="https://www.tiktok.com/@joshdoescode"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground font-semibold underline transition-colors"
          >
            make CS videos
          </a>
          .
        </p>

        <div
          className={cn("mt-8 flex items-center gap-4", "animate-fade-in opacity-0")}
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground inline-flex size-10 items-center justify-center rounded-md transition-colors"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground inline-flex size-10 items-center justify-center rounded-md transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href={siteConfig.socials.email}
            className="text-muted hover:text-foreground inline-flex size-10 items-center justify-center rounded-md transition-colors"
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

      <section
        className={cn(
          "border-border flex justify-center pt-10",
          "animate-fade-in opacity-0"
        )}
        style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
      >
        <ResumeLink href={RESUME_URL} />
      </section>
    </div>
  );
}
