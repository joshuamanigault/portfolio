export default function ProjectsLoading() {
  return (
    <section
      className="container-main projects-page"
      aria-label="Loading projects"
      aria-busy="true"
    >
      <h1>Projects</h1>
      <p className="page-lead">Selected software and research work.</p>
      <div className="project-entries">
        {[0, 1].map((item) => (
          <div key={item} className="project-entry" aria-hidden="true">
            <div className="bg-surface aspect-[16/10] animate-pulse rounded-sm" />
            <div className="space-y-3">
              <div className="bg-border h-3 w-32 animate-pulse" />
              <div className="bg-border h-6 w-48 animate-pulse" />
              <div className="bg-border h-4 w-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
