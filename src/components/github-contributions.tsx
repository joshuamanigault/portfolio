import { fetchGitHubContributions } from "@/lib/github";
import {
  GitHubContributionsChart,
  GitHubContributionsLegend,
} from "./github-contributions-client";

interface GitHubContributionsProps {
  username?: string;
}

export async function GitHubContributions({
  username = "joshuamanigault",
}: GitHubContributionsProps) {
  // Fetch contribution count server-side
  const contributionData = await fetchGitHubContributions(username);
  const totalContributions = contributionData?.totalContributions;

  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-xl font-semibold">GitHub Contributions</h2>

      <GitHubContributionsChart username={username} />

      <div className="flex items-center justify-between">
        <GitHubContributionsLegend />
        <p className="text-muted text-xs">
          {totalContributions !== undefined
            ? `${totalContributions.toLocaleString()} contributions in the last year`
            : "Contributions in the last year"}
        </p>
      </div>
    </div>
  );
}
