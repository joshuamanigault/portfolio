"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 1600);
  }

  return (
    <>
      <button
        type="button"
        className="copy-email-button"
        onClick={copyEmail}
        aria-label={status === "copied" ? "Email copied" : "Copy email"}
        title={status === "copied" ? "Copied" : "Copy email"}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {status === "copied" ? <path d="m5 12 4 4 10-10" /> : <>
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
          </>}
        </svg>
      </button>
      <span className="sr-only" role="status">
        {status === "copied" ? "Email copied to clipboard" : status === "error" ? "Could not copy. Select the email address to copy it manually." : ""}
      </span>
    </>
  );
}
