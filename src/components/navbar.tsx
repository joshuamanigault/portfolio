"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const onProjects = pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    <header className="site-header container-main">
      <Link href="/" className="nav-link site-name" aria-label="Joshua Manigault - Home">
        josh.
      </Link>
      <nav aria-label="Main navigation">
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
      </nav>
    </header>
  );
}
