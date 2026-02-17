import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Joshua Manigault — send a message through the contact form.",
  openGraph: {
    title: "Contact | Joshua Manigault",
    description: "Get in touch with Joshua Manigault — send a message through the contact form.",
  },
};

export default function ContactPage() {
  return (
    <Section className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <div className="w-full max-w-[500px]">
        <h1 className="mb-2 text-3xl font-medium text-muted">Get in Touch</h1>
        <p className="mb-8 text-sm text-card-foreground">
          Have a question or want to work together? Drop me a message.
        </p>
        <ContactForm />
      </div>
    </Section>
  );
}
