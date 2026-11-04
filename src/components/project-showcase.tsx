"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/types";
import styles from "./project-showcase.module.css";

function ProjectDetails({ project }: { project: Project }) {
  const url = project.liveUrl ?? project.githubUrl;
  const label = url ? new URL(url).hostname.replace(/^www\./, "") : undefined;

  return (
    <>
      <h3 className={styles.title}>
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className={styles.description}>{project.description}</p>
      {url && (
        <a
          className={styles.resource}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      )}
    </>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const sequence = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const container = sequence.current;
    if (!container || projects.length === 0) return;

    // Keep native scrolling. Sticky positioning releases at the sequence boundary.
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)"
    );
    const media = Array.from(
      container.querySelectorAll<HTMLElement>("[data-project-media]")
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches) {
        setActiveIndex(null);
        setPinned(false);
        return;
      }

      const center = window.innerHeight / 2;
      let closest = 0;
      let distance = Infinity;
      media.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top + rect.height / 2 - center);
        if (nextDistance < distance) {
          distance = nextDistance;
          closest = index;
        }
      });

      const bounds = container.getBoundingClientRect();
      const mediaHeight = media[0]?.getBoundingClientRect().height ?? 0;
      const restTop = (window.innerHeight - mediaHeight) / 2;
      setActiveIndex(closest);
      setPinned(bounds.top <= restTop && bounds.bottom >= restTop + mediaHeight);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(container);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktop.addEventListener("change", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktop.removeEventListener("change", scheduleUpdate);
    };
  }, [projects.length]);

  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      className={styles.showcase}
      aria-label="Selected projects"
      data-enhanced={activeIndex !== null}
    >
      <h2 className={styles.heading} data-pinned={pinned}>
        projects
      </h2>
      <div ref={sequence} className={styles.sequence}>
        <aside className={styles.sidebar} aria-label="Current project">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={styles.details}
              data-active={activeIndex === index}
              aria-hidden={activeIndex !== index}
              inert={activeIndex !== index}
            >
              <ProjectDetails project={project} />
            </div>
          ))}
        </aside>
        <div className={styles.entries}>
          {projects.map((project) => (
            <article
              key={project.slug}
              className={styles.entry}
              aria-label={project.title}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`${styles.media} ${project.slug === "asu-professorview" ? styles.logo : ""}`}
                data-project-media
                aria-label={`Read about ${project.title}`}
              >
                {project.images[0] && (
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 1168px) 720px, (min-width: 1024px) calc(100vw - 448px), (min-width: 768px) 720px, calc(100vw - 36px)"
                  />
                )}
              </Link>
              <div className={styles.inlineDetails}>
                <ProjectDetails project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
