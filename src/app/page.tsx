import Link from "next/link";
import { siteConfig, positioningStatement } from "@/data/site";
import { GitHubContributions } from "@/components/github-contributions";
import { Experience } from "@/components/experience";
import { ResumeLink } from "@/components/resume-link";

export default async function HomePage() {
  return (
    <div className="container-main home-page">
      <header className="mb-16">
        <h1>Hi, I&apos;m {siteConfig.name}</h1>
        <p className="home-role">Student Researcher at The Luminosity Lab</p>
        <p className="home-intro text-muted-foreground">
          {positioningStatement} I also{" "}
          <a
            href="https://www.tiktok.com/@joshdoescode"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline underline-offset-4 transition-colors"
          >
            make CS videos
          </a>
          .
        </p>
        <div className="home-links">
          <Link href="/projects" className="nav-link">
            View projects
          </Link>
          <a href={siteConfig.socials.email} className="nav-link">
            Get in touch
          </a>
        </div>
      </header>
      <Experience />
      <section className="mb-16">
        <GitHubContributions />
      </section>
      <section className="flex justify-center pt-10">
        <ResumeLink href="/Resume.pdf" />
      </section>
    </div>
  );
}
