import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "ASU ProfessorView",
    slug: "asu-professorview",
    description:
      "A Chrome extension that displays Rate My Professor reviews directly in ASU's class search catalog.",
    highlight: "5-star Chrome extension used by more than 1,300 students.",
    techStack: ["TypeScript", "JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/joshuamanigault/ASUProfessorView",
    liveUrl:
      "https://chromewebstore.google.com/detail/asu-professorview/kniajfafepienoohdheheofabfclpgnl",
    images: ["/images/projects/ProfView Logo.png"],
    category: "fullstack",
    dates: {
      started: "2025-10",
    },
  },
  {
    title: "Real-Time ASL Detection",
    slug: "asl-detection",
    description:
      "A real-time American Sign Language detection system using MediaPipe hand tracking and a Random Forest classifier to recognize ASL letters and digits via webcam.",
    highlight: "Recognizes 36 ASL letters and digits in real time on consumer hardware.",
    techStack: ["Python", "OpenCV", "MediaPipe", "Scikit-learn", "Numpy"],
    githubUrl: "https://github.com/joshuamanigault/realtime-asl-detection",
    images: ["/images/projects/asl-detection-screenshot.png"],
    category: "backend",
    dates: {
      started: "2024-08",
      completed: "2025-05",
    },
  },
];

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
