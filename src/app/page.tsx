import Link from "next/link";
import { GitHubContributions } from "@/components/github-contributions";
import { Experience } from "@/components/experience";
import { ProjectShowcase } from "@/components/project-showcase";
import { projects } from "@/data/projects";

export default async function HomePage() {
  return (
    <div className="container-main home-page">
      <header className="mb-16">
        <div className="home-intro text-muted-foreground">
          <p>
            I&apos;m currently a junior studying Computer Science at Arizona State
            University.
          </p>
          <p>
            I currently work as a Student Researcher at The Luminosity Lab, assiting in
            the development of an innovative educational robotics platform. Previously, I
            interned as a Software Engineer at Raytheon where I utilized C++ to support
            and enhance hardware test stations, as well as develop an internal automation
            tool to streamline reporting processes using Python.
          </p>
          <p>
            I also{" "}
            <a
              href="https://www.tiktok.com/@joshdoescode"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline underline-offset-4 transition-colors"
            >
              make CS videos
            </a>{" "}
            and build projects like{" "}
            <Link
              href="/projects/asu-professorview"
              className="hover:text-foreground underline underline-offset-4 transition-colors"
            >
              ASU ProfessorView
            </Link>
            , a browser extension that brings professor reviews directly into ASU&apos;s
            class search. Beyond coding, I co-founded It Starts With Us, a volunteer
            organization supporting students through tutoring and mentorship.
          </p>
        </div>
      </header>
      <section id="work" className="home-section" aria-labelledby="work-heading">
        <h2
          id="work-heading"
          className="text-foreground mb-8 text-base font-medium tracking-[-0.01em]"
        >
          work
        </h2>
        <Experience />
        <ProjectShowcase projects={projects} />
      </section>
      <GitHubContributions />
    </div>
  );
}
