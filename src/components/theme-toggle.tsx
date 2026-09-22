"use client";

import { Moon, Sun } from "lucide-react";
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

  if (!mounted) {
    return (
      <button
        className="text-nav-inactive hover:text-foreground inline-flex size-10 items-center justify-center rounded-full transition-colors active:scale-[0.98]"
        aria-label="Toggle theme"
      >
        <Sun size={18} />
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="text-nav-inactive hover:text-foreground relative inline-flex size-10 items-center justify-center rounded-full transition-[color,transform] active:scale-[0.96]"
      aria-label={"Switch to " + (isDark ? "light" : "dark") + " theme"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
