import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="container-main" role="contentinfo">
      <div className="bg-border mx-auto h-1 rounded-full" />
      <div className="flex items-center justify-between py-5 mb-12">
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
            className="text-foreground hover:text-accent transition-colors"
            aria-label="Send email"
          >
            <Mail size={20} />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
            aria-label="GitHub profile"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
