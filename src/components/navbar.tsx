import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./navbar.module.css";

export function Navbar() {
  return (
    <header className={`site-header container-main ${styles.header}`}>
      <Link href="/" className="nav-link site-name" aria-label="Joshua Manigault - Home">
        joshua manigault
      </Link>
      <nav aria-label="Main navigation" className={styles.navigation}>
        <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link">
          resume
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
