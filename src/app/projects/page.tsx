import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { enrichProjectsWithGitHub } from "@/lib/github";
import { ProjectsClient } from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Joshua Manigault's software engineering projects.",
  openGraph: {
    title: "Projects | Joshua Manigault",
    description: "Browse Joshua Manigault's software engineering projects.",
  },
};

export default async function ProjectsPage() {
  const projectsWithMeta = await enrichProjectsWithGitHub(projects);

  return <ProjectsClient projects={projectsWithMeta} />;
}
