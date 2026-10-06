"use client";

import { useEffect, useState } from "react";

export const projectSections = [
  { id: "about", label: "About" },
  { id: "how-it-works", label: "How it works" },
  { id: "built-with", label: "Built with" },
  { id: "links", label: "Links" },
];

export function ProjectToc() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const headings = projectSections.map(({ id }) => document.getElementById(id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.35;
      let current = projectSections[0].id;
      headings.forEach((heading, index) => {
        if (heading && heading.getBoundingClientRect().top <= readingLine + 1) {
          current = projectSections[index].id;
        }
      });
      // A short final section may never reach the reading line.
      if (
        window.scrollY > 0 &&
        Math.ceil(window.scrollY + window.innerHeight) >=
          document.documentElement.scrollHeight - 2
      ) {
        current = projectSections[projectSections.length - 1].id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    const observer = new ResizeObserver(schedule);
    const article = document.querySelector(".project-reader");
    if (article) observer.observe(article);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <aside className="project-toc" aria-label="Project sections">
      <nav className="project-toc-inner">
        <span
          className="toc-marker"
          aria-hidden="true"
          style={{
            transform: `translateY(${projectSections.findIndex(({ id }) => id === active) * 32}px)`,
          }}
        />
        {projectSections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
