"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/resume.pdf", label: "Resume", external: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full",
        "px-[10%] py-4",
        "bg-background/80 backdrop-blur-md",
        "flex items-center justify-between",
        "transition-all duration-300"
      )}
    >
      <Link
        href="/"
        className="text-[25px] font-semibold text-foreground no-underline transition-opacity hover:opacity-70"
        aria-label="Joshua Manigault - Home"
      >
        josh.
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
        {navLinks.map((link) => {
          const isActive =
            !link.external &&
            (link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href));

          if (link.external) {
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-6 text-lg font-medium text-nav-inactive transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "ml-6 text-lg font-medium transition-colors duration-300",
                isActive
                  ? "text-foreground"
                  : "text-nav-inactive hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <div className="ml-6">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile menu button */}
      <div className="flex items-center gap-3 md:hidden">
        <ThemeToggle />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
            const isActive =
              !link.external &&
              (link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href));

            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-medium text-nav-inactive transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xl font-medium transition-colors",
                  isActive ? "text-foreground" : "text-nav-inactive hover:text-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
