export type ProjectCategory = "web" | "mobile" | "backend" | "fullstack" | "other";

export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  category: ProjectCategory;
  dates: {
    started: string;
    completed?: string;
  };
}

export interface GitHubRepoMeta {
  stars: number;
  lastUpdated: string;
}

export interface ProjectWithMeta extends Project {
  github?: GitHubRepoMeta;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}
