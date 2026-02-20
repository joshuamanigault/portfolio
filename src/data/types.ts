export type ProjectStatus = "completed" | "in-progress" | "planned";
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
  featured: boolean;
  category: ProjectCategory;
  status: ProjectStatus;
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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
