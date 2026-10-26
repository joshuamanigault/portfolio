"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { AsciiHorse } from "@/components/ascii-horse";
import { siteConfig } from "@/data/site";

const siteLinks = [
  { label: "github", href: siteConfig.socials.github },
  { label: "linkedin", href: siteConfig.socials.linkedin },
  { label: "tiktok", href: "https://www.tiktok.com/@joshdoescode" },
  { label: "email", href: siteConfig.socials.email },
];

const contactLinks = [
  {
    label: "email",
    text: siteConfig.email,
    href: siteConfig.socials.email,
  },
  {
    label: "github",
    text: "github.com/joshuamanigault",
    href: siteConfig.socials.github,
  },
  {
    label: "linkedin",
    text: "linkedin.com/in/joshuamanigault",
    href: siteConfig.socials.linkedin,
  },
];

function LandingFooter() {
  return (
    <footer className="landing-footer container-main" aria-labelledby="find-me-heading">
      <div className="landing-footer-inner">
        <div className="landing-footer-grid">
          <div>
            <h2 id="find-me-heading" className="landing-footer-heading">
              find me
            </h2>
            <dl className="contact-list">
              {contactLinks.map(({ label, text, href }) => (
                <div className="contact-row" key={label}>
                  <dt>{label}</dt>
                  <dd>
                    <a
                      href={href}
                      target={label === "email" ? undefined : "_blank"}
                      rel={label === "email" ? undefined : "noopener noreferrer"}
                    >
                      {text}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <AsciiHorse />
        </div>
        <p className="landing-footer-meta">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer container-main">
      <p>
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </p>
      <nav aria-label="Social and contact links" className="footer-links">
        {siteLinks.map(({ label, href }, index) => (
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
      </nav>
    </footer>
  );
}

export function Footer() {
  const pathname = usePathname();

  return pathname === "/" ? <LandingFooter /> : <SiteFooter />;
}
