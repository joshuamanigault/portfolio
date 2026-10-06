import { Fragment } from "react";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { label: "github", href: siteConfig.socials.github },
  { label: "linkedin", href: siteConfig.socials.linkedin },
  { label: "tiktok", href: "https://www.tiktok.com/@joshdoescode" },
  { label: "email", href: siteConfig.socials.email },
  { label: "resume", href: "/Resume.pdf" },
];

export function Footer() {
  return (
    <footer className="site-footer container-main">
      <p>
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </p>
      <nav aria-label="Social and contact links" className="footer-links">
        {links.map(({ label, href }, index) => (
          <Fragment key={label}>
            {index > 0 && <span aria-hidden="true">·</span>}
            <a
              href={href}
              className="nav-link"
              target={label === "email" ? undefined : "_blank"}
              rel={label === "email" ? undefined : "noopener noreferrer"}
            >
              {label}
            </a>
          </Fragment>
        ))}
        <span aria-hidden="true">·</span>
        <ThemeToggle />
      </nav>
    </footer>
  );
}
