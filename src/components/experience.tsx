import Image from "next/image";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section
      className={cn("mb-16", "animate-fade-in opacity-0")}
      style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
    >
      <h2 className="text-foreground mb-8 text-xl font-semibold">Experience</h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="experience-item grid grid-cols-[32px_minmax(0,1fr)] gap-x-3"
          >
            <div className="pt-0.5">
              {exp.logoSrc && (
                <Image
                  src={exp.logoSrc}
                  alt={exp.logoAlt || exp.company}
                  width={32}
                  height={32}
                  className="flex-shrink-0 rounded-full"
                />
              )}
            </div>

            <div className="min-w-0">
              <div className="experience-header flex items-start justify-between gap-4">
                <div className="experience-title min-w-0">
                  <h3 className="text-foreground text-base font-medium">{exp.role}</h3>
                </div>
                <span className="experience-date text-muted-foreground text-sm whitespace-nowrap">
                  {exp.dateRange}
                </span>
              </div>
              <p className="experience-company text-muted-foreground mt-1 text-sm">
                {exp.company}
              </p>
              <p className="experience-blurb text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
