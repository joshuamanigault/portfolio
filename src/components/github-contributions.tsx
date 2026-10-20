import { GitHubContributionsChart } from "./github-contributions-client";

interface GitHubContributionsProps {
  username?: string;
}

export function GitHubContributions({
  username = "joshuamanigault",
}: GitHubContributionsProps) {
  return (
    <section aria-label="GitHub contributions">
      <h2 className="text-foreground mb-8 text-xl font-semibold">building</h2>
      <GitHubContributionsChart username={username} />
    </section>
  );
}
