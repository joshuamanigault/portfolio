import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/data/site";

const updatedDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${siteConfig.updatedAt}T00:00:00Z`));

export function SiteHeader() {
  return (
    <header className="site-header container-main">
      <div>
        <Link href="/" className="site-name" aria-label={`${siteConfig.name} — Home`}>
          {siteConfig.name}
        </Link>
        <p className="site-updated">
          Updated <time dateTime={siteConfig.updatedAt}>{updatedDate}</time>
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}
