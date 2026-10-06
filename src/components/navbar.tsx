"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./navbar.module.css";

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const onProjects = pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    <header className={`site-header container-main ${styles.header}`}>
      <Link href="/" className="nav-link site-name" aria-label="Joshua Manigault - Home">
        joshua manigault
      </Link>
      <nav aria-label="Main navigation" className={styles.navigation}>
        <Link
          href="/projects"
          className="nav-link"
          aria-current={onProjects ? "page" : undefined}
        >
          projects
        </Link>
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          resume
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
