import { GitHubContributionsChart } from "./github-contributions-client";

interface GitHubContributionsProps {
  username?: string;
}

export function GitHubContributions({
  username = "joshuamanigault",
}: GitHubContributionsProps) {
  return (
    <section className="home-section" aria-label="GitHub contributions">
      <h2 className="text-foreground mb-8 text-base font-medium tracking-[-0.01em]">
        building
      </h2>
      <GitHubContributionsChart username={username} />
    </section>
  );
}
