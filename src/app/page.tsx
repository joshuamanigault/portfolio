import { Section } from "@/components/section";
import { ProjectGrid } from "@/components/project-grid";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/data/projects";
import { enrichProjectsWithGitHub } from "@/lib/github";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

export default async function HomePage() {
  const featured = getFeaturedProjects();
  const featuredWithMeta = await enrichProjectsWithGitHub(featured);

  return (
    <>
      <HeroSection />

      <Section id="projects">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-medium text-muted">Projects</h2>
          <Button href="/projects" variant="ghost" size="sm">
            View all
            <ArrowRight size={16} />
          </Button>
        </div>
        <ProjectGrid projects={featuredWithMeta} />
      </Section>
    </>
  );
}
