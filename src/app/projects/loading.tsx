import { Section } from "@/components/section";

export default function ProjectsLoading() {
  return (
    <Section>
      <div className="mb-10">
        <div className="bg-border h-9 w-36 animate-pulse rounded-sm" />
        <div className="bg-border mt-4 h-4 w-full max-w-md animate-pulse rounded-sm" />
      </div>
      <div className="space-y-0" aria-label="Loading projects">
        {[0, 1].map((item) => (
          <div
            key={item}
            className="border-border grid gap-6 border-t py-8 md:grid-cols-[minmax(0,1fr)_13.5rem]"
          >
            <div className="space-y-4">
              <div className="bg-border h-3 w-24 animate-pulse rounded-sm" />
              <div className="bg-border h-6 w-52 animate-pulse rounded-sm" />
              <div className="bg-border h-4 w-full animate-pulse rounded-sm" />
              <div className="bg-border h-4 w-3/4 animate-pulse rounded-sm" />
            </div>
            <div className="bg-surface aspect-video animate-pulse rounded-md md:aspect-[4/3]" />
          </div>
        ))}
      </div>
    </Section>
  );
}
