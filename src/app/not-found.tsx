import Link from "next/link";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section fullHeight className="text-center">
      <div>
        <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="text-accent transition-colors hover:underline"
        >
          Go back home
        </Link>
      </div>
    </Section>
  );
}
