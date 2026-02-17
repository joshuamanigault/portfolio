"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useMemo, useCallback, Suspense } from "react";
import { Search, X } from "lucide-react";
import { Section } from "@/components/section";
import { ProjectGrid } from "@/components/project-grid";
import { cn } from "@/lib/utils";
import type { ProjectWithMeta } from "@/data/types";

interface ProjectsClientProps {
  projects: ProjectWithMeta[];
}

function ProjectsContent({ projects }: ProjectsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get("category") ?? "all";
  const initialTech = searchParams.get("tech") ?? "";
  const initialSearch = searchParams.get("q") ?? "";

  const [category, setCategory] = useState(initialCategory);
  const [tech, setTech] = useState(initialTech);
  const [search, setSearch] = useState(initialSearch);

  // Extract unique categories and tech stacks
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [projects]);

  const techStacks = useMemo(() => {
    const techs = new Set(projects.flatMap((p) => p.techStack));
    return Array.from(techs).sort();
  }, [projects]);

  // Update URL params
  const updateParams = useCallback(
    (newCategory: string, newTech: string, newSearch: string) => {
      const params = new URLSearchParams();
      if (newCategory !== "all") params.set("category", newCategory);
      if (newTech) params.set("tech", newTech);
      if (newSearch) params.set("q", newSearch);
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname]
  );

  // Filter projects
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesTech = !tech || p.techStack.includes(tech);
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [projects, category, tech, search]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    updateParams(cat, tech, search);
  };

  const handleTechChange = (t: string) => {
    const newTech = t === tech ? "" : t;
    setTech(newTech);
    updateParams(category, newTech, search);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateParams(category, tech, value);
  };

  const clearFilters = () => {
    setCategory("all");
    setTech("");
    setSearch("");
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = category !== "all" || tech !== "" || search !== "";

  return (
    <Section>
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-medium text-muted">Projects</h1>
        <p className="text-sm text-card-foreground">
          A collection of my software engineering work.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search projects..."
          className={cn(
            "w-full rounded-lg border border-input-border bg-card py-2.5 pr-10 pl-10",
            "text-sm text-foreground placeholder:text-muted",
            "transition-colors focus:border-accent focus:outline-none"
          )}
          aria-label="Search projects"
        />
        {search && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors",
              category === cat
                ? "bg-foreground text-background"
                : "bg-card text-card-foreground hover:bg-surface"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech filter */}
      <div className="mb-8 flex flex-wrap gap-1.5">
        {techStacks.map((t) => (
          <button
            key={t}
            onClick={() => handleTechChange(t)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              tech === t
                ? "bg-accent/30 text-accent-foreground"
                : "bg-accent/10 text-muted hover:bg-accent/20"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Active filters indicator */}
      {hasActiveFilters && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-xs text-muted">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
          </span>
          <button
            onClick={clearFilters}
            className="text-xs text-accent hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      <ProjectGrid projects={filtered} />
    </Section>
  );
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  return (
    <Suspense fallback={<Section><div className="py-20 text-center text-muted">Loading projects...</div></Section>}>
      <ProjectsContent projects={projects} />
    </Suspense>
  );
}
