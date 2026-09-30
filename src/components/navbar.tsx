"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [{ href: "/projects", label: "Projects" }];

const RESUME_URL =
  "https://drive.google.com/file/d/1iWdY37mxMjlfx-IMbYnPiJIDkQcx3fC_/view?usp=sharing";

export function Navbar() {
  // `usePathname` can be null while the production router initializes on the
  // first request. This component only renders on known app routes, so the
  // safe fallback is the home route.
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <>
      {isHome && (
        <div className="relative h-[210px] w-full overflow-hidden sm:h-[260px] md:h-[320px]">
          <Image
            src="/images/painting-hero.png"
            alt="A panoramic oil painting of a flowering tree beneath a muted blue sky"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="from-background/20 absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent"
          />
        </div>
      )}

      <header className={cn("w-full", !isHome && "mt-12")}>
        <div className="container-main flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-foreground text-[25px] font-semibold no-underline transition-opacity hover:opacity-70"
            aria-label="Joshua Manigault - Home"
          >
            josh.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "nav-link ml-6 text-sm font-medium transition-colors duration-300",
                    isActive && "nav-link-active",
                    isActive
                      ? "text-foreground"
                      : "text-nav-inactive hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-nav-inactive hover:text-foreground ml-6 text-sm font-medium transition-colors duration-300"
            >
              Resume
            </a>
            <div className="ml-6">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground inline-flex size-10 items-center justify-center rounded-md active:scale-[0.98]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav overlay */}
        {mobileOpen && (
          <nav
            className={cn(
              "fixed inset-0 top-[60px] z-40",
              "flex flex-col items-center gap-6 pt-12",
              "bg-background/95 backdrop-blur-lg",
              "md:hidden"
            )}
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "nav-link text-xl font-medium transition-colors",
                    isActive && "nav-link-active",
                    isActive
                      ? "text-foreground"
                      : "text-nav-inactive hover:text-foreground"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-nav-inactive hover:text-foreground text-xl font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Resume
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
