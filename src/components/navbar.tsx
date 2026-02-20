"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full",
        "bg-background/80 backdrop-blur-md",
        "transition-all duration-300"
      )}
    >
      {/* Inner container constrained to main content width */}
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
                className={cn(
                  "ml-6 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-foreground" : "text-nav-inactive hover:text-foreground"
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
