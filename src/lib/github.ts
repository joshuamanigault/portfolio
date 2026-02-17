import type { GitHubRepoMeta, Project, ProjectWithMeta } from "@/data/types";

function extractOwnerAndRepo(
  githubUrl: string
): { owner: string; repo: string } | null {
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
        next: { revalidate: 3600 }, // Revalidate every hour at build time
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
