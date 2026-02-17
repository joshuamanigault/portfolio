import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="container-main" role="contentinfo">
      <div className="mx-auto h-1 rounded-full bg-border" />
      <div className="flex items-center justify-between py-5">
        <Link
          href="/"
          className="text-[25px] font-semibold text-foreground no-underline transition-opacity hover:opacity-70"
          aria-label="Joshua Manigault - Home"
        >
          josh.
        </Link>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.socials.email}
            className="text-foreground transition-colors hover:text-accent"
            aria-label="Send email"
          >
            <Mail size={20} />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-colors hover:text-accent"
            aria-label="GitHub profile"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
      <p className="pb-4 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
        reserved.
      </p>
    </footer>
  );
}
