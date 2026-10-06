"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { GitHubCalendar } from "react-github-calendar";
import styles from "./github-contributions.module.css";

// Track mount state without useEffect + setState
const emptySubscribe = () => () => {};

// Custom color themes matching GitHub's contribution levels
const THEME_COLORS_LIGHT = [
  "#ebedf0", // no contributions (GitHub's default empty color - grey)
  "#b8e4b8", // lightest shade
  "#7ac87a", // light shade
  "#50b050", // medium shade
  "#40a050", // base color (most contributions)
];

const THEME_COLORS_DARK = [
  "#1a1a1a", // no contributions (dark grey background)
  "#2a5a2a", // lightest shade
  "#3a7a3a", // light shade
  "#4aba5a", // medium shade (base)
  "#5ada6a", // brightest shade
];

interface GitHubContributionsClientProps {
  username: string;
}

export function GitHubContributionsChart({ username }: GitHubContributionsClientProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={styles.loading}
        aria-label="Loading GitHub contributions"
        aria-busy="true"
      >
        <div className="bg-surface h-24 w-full animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className={styles.calendar}
      tabIndex={0}
      role="region"
      aria-label="GitHub contribution calendar. Scroll horizontally to see all dates."
    >
      <GitHubCalendar
        username={username}
        colorScheme={isDark ? "dark" : "light"}
        theme={{
          light: THEME_COLORS_LIGHT,
          dark: THEME_COLORS_DARK,
        }}
        blockSize={11}
        blockMargin={2}
        blockRadius={0}
        fontSize={12}
        showMonthLabels={false}
        showColorLegend={false}
        showTotalCount={false}
      />
    </div>
  );
}

export function GitHubContributionsLegend() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";
  const legendColors = isDark ? THEME_COLORS_DARK : THEME_COLORS_LIGHT;

  return (
    <div className="flex items-center gap-1">
      <span className="text-muted text-xs">Less</span>
      {legendColors.map((color, i) => (
        <div key={i} className="h-3 w-3 rounded" style={{ backgroundColor: color }} />
      ))}
      <span className="text-muted text-xs">More</span>
    </div>
  );
}
