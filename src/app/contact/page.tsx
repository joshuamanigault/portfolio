import { Mail, MessageCircle, Linkedin, Github } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Joshua Manigault",
  description:
    "Get in touch with Joshua Manigault through email, Discord, LinkedIn, or GitHub.",
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    handle: "n.joshuamanigault@gmail.com",
    href: "mailto:n.joshuamanigault@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    handle: "@norcaz  ", // Replace with your actual Discord handle
    href: "#", // Discord doesn't have direct links, or use discord.com/users/YOUR_ID
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "joshuamanigault",
    href: siteConfig.socials.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    handle: "joshuamanigault",
    href: siteConfig.socials.github,
  },
];

export default function ContactPage() {
  return (
    <div className="container-main py-12 md:py-16">
      {/* Header */}
      <header
        className={cn("animate-fade-in mb-16 opacity-0")}
        style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
      >
        <h1 className="text-foreground mb-3 text-xl font-semibold">Contact</h1>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
          Want to get in touch? Here are the best ways to reach me.
        </p>
      </header>

      {/* Contact Methods - Simple List */}
      <div className="space-y-8">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <div
              key={method.label}
              className={cn("animate-fade-in opacity-0")}
              style={{
                animationDelay: `${50 + index * 50}ms`,
                animationFillMode: "forwards",
              }}
            >
              <a
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-baseline gap-3 transition-all duration-200"
              >
                {/* Icon */}
                <Icon
                  size={18}
                  className="text-muted group-hover:text-foreground mt-0.5 shrink-0 transition-colors"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="text-foreground text-base font-medium">
                    {method.label}
                  </div>
                  <div className="text-muted-foreground mt-0.5 text-sm">
                    {method.handle}
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
