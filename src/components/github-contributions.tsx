import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
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
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">GitHub Contributions</h2>
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors"
        >
          View on GitHub
          <ArrowUpRight size={12} />
        </a>
      </div>

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
