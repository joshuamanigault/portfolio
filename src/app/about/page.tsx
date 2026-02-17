import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";
import {
  aboutBio,
  education,
  experience,
  certifications,
} from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Joshua Manigault — education, experience, certifications, and background.",
  openGraph: {
    title: "About | Joshua Manigault",
    description:
      "Learn more about Joshua Manigault — education, experience, certifications, and background.",
  },
};

function ExperienceSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <h2 className="mb-2.5 text-xl font-semibold text-muted-foreground">
        {title}
      </h2>
      <div className="mb-6 h-0.5 w-full bg-muted" />
      {children}
    </div>
  );
}

function ExperienceItem({
  primary,
  secondary,
  date,
}: {
  primary: string;
  secondary?: string;
  date: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-end gap-4">
        <span className="text-sm font-medium tracking-wide text-muted-foreground">
          {primary}
        </span>
        {secondary && (
          <span className="text-sm font-normal text-muted">{secondary}</span>
        )}
      </div>
      <span className="mt-1 block text-sm font-normal text-muted">{date}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero / intro section */}
      <Section fullHeight className="pb-0">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-0">
          {/* Photo */}
          <div className="relative mx-auto h-[50vh] w-full max-w-[36%] shrink-0 overflow-hidden md:mx-0 md:h-[65vh]">
            <Image
              src="/profile.jpg"
              alt="Joshua Manigault — Personal Track & Field Photo"
              fill
              className="object-cover object-left"
              sizes="(max-width: 768px) 100vw, 36vw"
              priority
            />
          </div>

          {/* Bio text */}
          <div className="flex flex-col justify-center self-center md:ml-16">
            {aboutBio.map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  "mb-7 text-[15px] font-light leading-[30px] tracking-wide text-muted",
                  "opacity-0 animate-slide-in",
                )}
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationFillMode: "forwards",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Experience section */}
      <section className="mt-0 bg-surface py-24">
        <div className="container-wide">
          <div className="flex flex-col gap-24">
            {/* Education */}
            <ExperienceSection title="Education">
              {education.map((edu) => (
                <ExperienceItem
                  key={edu.institution}
                  primary={edu.institution}
                  secondary={edu.degree}
                  date={`${edu.startDate.replace("-", " ")} - ${edu.endDate?.replace("-", " ") ?? "Present"}`}
                />
              ))}
            </ExperienceSection>

            {/* Experience */}
            <ExperienceSection title="Experience">
              {experience.map((exp) => (
                <ExperienceItem
                  key={`${exp.company}-${exp.role}`}
                  primary={exp.company}
                  secondary={exp.role}
                  date={exp.startDate}
                />
              ))}
            </ExperienceSection>

            {/* Certifications */}
            <ExperienceSection title="Certifications">
              {certifications.map((cert) => (
                <ExperienceItem
                  key={cert.name}
                  primary={`${cert.name} — ${cert.issuer}`}
                  date={cert.year}
                />
              ))}
            </ExperienceSection>
          </div>
        </div>
      </section>
    </>
  );
}
