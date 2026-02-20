import type { GitHubRepoMeta, Project, ProjectWithMeta } from "@/data/types";

export interface GitHubContributionData {
  totalContributions: number;
}

function extractOwnerAndRepo(githubUrl: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(githubUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  } catch {
    // Invalid URL
  }
  return null;
}

export async function fetchGitHubMeta(
  githubUrl: string
): Promise<GitHubRepoMeta | undefined> {
  const parsed = extractOwnerAndRepo(githubUrl);
  if (!parsed) return undefined;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 }, 
      }
    );

    if (!response.ok) return undefined;

    const data = await response.json();
    return {
      stars: data.stargazers_count ?? 0,
      lastUpdated: data.pushed_at ?? data.updated_at ?? "",
    };
  } catch {
    return undefined;
  }
}

export async function enrichProjectsWithGitHub(
  projects: Project[]
): Promise<ProjectWithMeta[]> {
  const enriched = await Promise.all(
    projects.map(async (project) => {
      const github = project.githubUrl
        ? await fetchGitHubMeta(project.githubUrl)
        : undefined;
      return { ...project, github };
    })
  );
  return enriched;
}

/**
 * Fetches the total contribution count for a GitHub user in the last year.
 * Uses the GitHub GraphQL API which requires a GITHUB_TOKEN.
 */
export async function fetchGitHubContributions(
  username: string
): Promise<GitHubContributionData | undefined> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN not set - contribution count will not be available");
    return undefined;
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) return undefined;

    const data = await response.json();
    const totalContributions =
      data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;

    if (typeof totalContributions === "number") {
      return { totalContributions };
    }

    return undefined;
  } catch {
    return undefined;
  }
}
