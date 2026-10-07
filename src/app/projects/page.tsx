import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Joshua Manigault's software engineering projects.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Joshua Manigault",
    description: "Browse Joshua Manigault's software engineering projects.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <section className="container-main projects-page">
      <header>
        <h1>Projects</h1>
        <p className="page-lead">Selected software and research work.</p>
      </header>
      <ProjectGrid projects={projects} />
    </section>
  );
}
