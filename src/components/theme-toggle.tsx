"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore, useCallback, useRef } from "react";

const emptySubscribe = () => () => {};

type ThemeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ThemeViewTransition;
};

type ViewTransitionAnimationOptions = KeyframeAnimationOptions & {
  pseudoElement: string;
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitionInProgress = useRef(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const isDark = resolvedTheme === "dark";

  const toggleTheme = useCallback(() => {
    const nextTheme = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduceMotion || transitionInProgress.current) {
      setTheme(nextTheme);
      return;
    }

    const buttonBounds = buttonRef.current?.getBoundingClientRect();
    const originX = buttonBounds
      ? buttonBounds.left + buttonBounds.width / 2
      : window.innerWidth / 2;
    const originY = buttonBounds ? buttonBounds.top + buttonBounds.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    transitionInProgress.current = true;
    const transition = doc.startViewTransition(() => {
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      document.documentElement.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0 at ${originX}px ${originY}px)`,
              `circle(${radius}px at ${originX}px ${originY}px)`,
            ],
          },
          {
            duration: 620,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "both",
            pseudoElement: "::view-transition-new(root)",
          } as ViewTransitionAnimationOptions
        );
      })
      .catch(() => undefined);

    transition.finished.finally(() => {
      transitionInProgress.current = false;
    });
  }, [isDark, setTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      disabled={!mounted}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
    >
      <svg
        className="theme-icon theme-icon-sun"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      <svg
        className="theme-icon theme-icon-moon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" />
      </svg>
    </button>
  );
}
