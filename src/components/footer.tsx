import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="container-main" role="contentinfo">
      <div className="bg-border mx-auto h-px" />
      <div className="mb-12 flex items-center justify-between py-5">
        <p className="text-muted text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground no-underline transition-opacity hover:opacity-70"
          >
            Joshua Manigault
          </a>
        </p>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.socials.email}
            className="text-foreground inline-flex size-10 items-center justify-center rounded-md transition-opacity hover:opacity-70"
            aria-label="Send email"
          >
            <Mail size={20} />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground inline-flex size-10 items-center justify-center rounded-md transition-opacity hover:opacity-70"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground inline-flex size-10 items-center justify-center rounded-md transition-opacity hover:opacity-70"
            aria-label="GitHub profile"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
