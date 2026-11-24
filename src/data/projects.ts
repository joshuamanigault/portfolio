import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "ASU ProfessorView",
    slug: "asu-professorview",
    description:
      "A Chrome extension that displays Rate My Professor reviews directly in ASU's class search catalog.",
    highlight: "5-star Chrome extension used by more than 2,100 students.",
    techStack: ["TypeScript", "JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/joshuamanigault/ASUProfessorView",
    liveUrl:
      "https://chromewebstore.google.com/detail/asu-professorview/kniajfafepienoohdheheofabfclpgnl",
    images: ["/images/projects/ASU ProfessorView.png"],
    videoUrl: "/videos/asu-professorview-demov2.mp4",
    category: "fullstack",
    dates: {
      started: "2025-10",
    },
  },
  {
    title: "Marrow (Sunhacks 9.0)",
    slug: "marrow",
    description:
      "An interactive 3D learning workspace that turns real fossil CT scans into explorable specimens in the browser - built in 24 hours at Sunhacks 9.0.",
    highlight:
      "Built at sunhacks — inspect named bones, switch Solid / X-ray / Exploded views, and pin observations on a real Yale Peabody specimen.",
    techStack: ["React", "TypeScript", "Three.js", "Python", "FastAPI"],
    githubUrl: "https://github.com/joshuamanigault/Marrow-Sunhacks",
    images: ["/images/projects/marrow-demo.png"],
    videoUrl: "/videos/marrow-demo.mp4",
    category: "fullstack",
    dates: {
      started: "2026-11",
      completed: "2026-11",
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

export function formatProjectPeriod(project: Project): string {
  const started = project.dates.started.slice(0, 4);
  const completed = project.dates.completed?.slice(0, 4);
  return completed ? `${started} — ${completed}` : `${started} — present`;
}

export function getProjectSummary(project: Project) {
  const summaries: Record<string, { tagline: string; metric: string }> = {
    "asu-professorview": {
      tagline: "Professor reviews, right where you choose your classes.",
      metric: "2,100+ students",
    },
    marrow: {
      tagline: "Real fossil CT scans, explorable in 3D in the browser.",
      metric: "sunhacks",
    },
    "asl-detection": {
      tagline: "American Sign Language recognition through your webcam.",
      metric: "36 letters & digits",
    },
  };
  return (
    summaries[project.slug] ?? { tagline: project.description, metric: project.category }
  );
}

interface ProjectStory {
  about: string;
  steps: string[];
  technology: string;
}

export const projectStories: Record<string, ProjectStory> = {
  "asu-professorview": {
    about:
      "Choosing a class should not require jumping between the course catalog and a separate professor review site. ASU ProfessorView brings Rate My Professor ratings and reviews directly into Arizona State University's class search, so students can make an informed decision while browsing courses.",
    steps: [
      "Browse ASU Class Search as usual. Professor rating cards appear alongside instructor names in the catalog.",
      "See ratings, difficulty scores, student reviews, and common tags without leaving the page.",
      "Choose compact or detailed cards in the extension settings. Cached professor data reduces repeat requests as you browse.",
    ],
    technology:
      "Built with TypeScript, JavaScript, HTML, and CSS, the extension integrates with ASU's existing catalog pages. It supports Chrome and Firefox and searches across ASU campuses, including Tempe, Polytechnic, and West.",
  },
  marrow: {
    about:
      "Paleontology learning usually means flat images or locked-down viewers. Marrow turns published fossil CT studies into an interactive 3D workspace in the browser, so you can inspect named bones, change how the specimen is visualized, and pin observations without inventing anatomy that is not in the scan.",
    steps: [
      "Open a curated specimen and load its animal, accession, institution, and citation in the workspace.",
      "Rotate, select, hide, and focus named bones. Switch between Solid, X-ray, and Exploded views, then reset the camera and display.",
      "Pin notes to bone-space points that survive explode and reset, and optionally ask grounded anatomy questions through a server-side Gemini panel.",
    ],
    technology:
      "The frontend is React, TypeScript, Vite, and React Three Fiber / Three.js. The backend is Python FastAPI with prepared GLB assets and manifests. Optional MediaPipe hand control runs in the browser; Gemini answers stay server-side and cite prepared facts only.",
  },
  "asl-detection": {
    about:
      "A real-time computer vision project that recognizes American Sign Language letters and digits from a webcam feed. It combines hand tracking with a machine learning classifier to turn detected hand positions into an on-screen prediction.",
    steps: [
      "OpenCV captures frames from the webcam and makes them available for processing.",
      "MediaPipe tracks the hand and extracts landmarks from each frame.",
      "A Random Forest classifier uses the landmark data to predict an ASL letter or digit, and the result appears with the live camera feed.",
    ],
    technology:
      "The pipeline uses Python and OpenCV for camera capture, MediaPipe for hand tracking, NumPy for working with landmark data, and Scikit-learn for the Random Forest classifier. It recognizes 36 letters and digits on consumer hardware.",
  },
};
