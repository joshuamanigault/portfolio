import { fetchGitHubContributions } from "@/lib/github";
import styles from "./github-contributions.module.css";
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
    <section className={styles.terminal} aria-label="GitHub contributions">
      <header className={styles.header}>
        <h2 className={styles.command}>
          <span className={styles.prompt} aria-hidden="true">
            ${" "}
          </span>
          git log --stat
        </h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-link ${styles.githubLink}`}
          aria-label={`Visit ${username}'s GitHub profile`}
        >
          github <span aria-hidden="true">→</span>
        </a>
      </header>

      <GitHubContributionsChart username={username} />

      <p className={styles.scrollHint} aria-hidden="true">
        ← scroll →
      </p>

      <div className={styles.footer}>
        <GitHubContributionsLegend />
        <p className={styles.count}>
          {totalContributions !== undefined
            ? `${totalContributions.toLocaleString()} contributions in the last year`
            : "Contributions in the last year"}
        </p>
      </div>
    </section>
  );
}
