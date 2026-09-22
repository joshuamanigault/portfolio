import { ArrowRight, FileDown } from "lucide-react";

type ResumeLinkProps = {
  href: string;
};

export function ResumeLink({ href }: ResumeLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-[52px] w-52 rounded-full p-1 no-underline"
      aria-label="Open resume PDF in a new tab"
    >
      <span
        aria-hidden="true"
        className="bg-accent absolute inset-y-1 left-1 w-11 rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-[calc(100%-0.5rem)] group-focus-visible:w-[calc(100%-0.5rem)]"
      />

      <span className="absolute top-1/2 left-4 z-10 size-5 -translate-y-1/2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1">
        <ArrowRight
          aria-hidden="true"
          className="text-accent-foreground absolute inset-0 size-5 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-0 group-focus-visible:translate-x-1 group-focus-visible:opacity-0"
        />
        <FileDown
          aria-hidden="true"
          className="text-accent-foreground absolute inset-0 size-5 -translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        />
      </span>

      <span className="text-foreground group-hover:text-accent-foreground group-focus-visible:text-accent-foreground absolute top-1/2 left-16 z-10 -translate-y-1/2 text-sm font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-300">
        open resume.pdf
      </span>
    </a>
  );
}
