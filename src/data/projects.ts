import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "ASU ProfessorView",
    slug: "asu-professorview",
    description:
      "A Chrome extension that displays Rate My Professor reviews directly in ASU's class search catalog.",
    longDescription:
      "ASU ProfessorView enhances the Arizona State University class catalog by embedding professor ratings and reviews from Rate My Professor directly into the search results. Students no longer need to switch between tabs — ratings appear right where they're browsing courses. Published on the Chrome Web Store with 5 stars and 750+ users.",
    techStack: ["TypeScript", "JavaScript", "HTML", "CSS", ],
    githubUrl: "https://github.com/joshuamanigault/ASUProfessorView",
    liveUrl: "https://chromewebstore.google.com/detail/asu-professorview/kniajfafepienoohdheheofabfclpgnl",
    images: ["/images/projects/ProfView Logo.png"],
    featured: true,
    category: "fullstack",
    status: "in-progress",
    dates: {
      started: "2025-10"
    },
  },
  {
    title: "Portfolio Website",
    slug: "portfolio-website",
    description:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS to showcase projects and skills.",
    longDescription:
      "This portfolio website serves as a central hub for showcasing my software engineering projects, skills, and experience. Built with modern web technologies including Next.js, TypeScript, and Tailwind CSS, it features a data-driven architecture, dark mode support, and optimized performance. The site demonstrates my approach to clean code architecture and thoughtful UI design.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    githubUrl: "https://github.com/joshuamanigault/portfolio",
    images: [],
    featured: false,
    category: "web",
    status: "completed",
    dates: {
      started: "2024-01",
      completed: "2024-06",
    },
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(projects.map((p) => p.category));
  return ["all", ...Array.from(categories)];
}

export function getAllTechStacks(): string[] {
  const techSet = new Set(projects.flatMap((p) => p.techStack));
  return Array.from(techSet).sort();
}

export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase();
  return projects.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}
