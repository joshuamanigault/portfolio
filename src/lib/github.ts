interface GitHubContributionData {
  totalContributions: number;
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
