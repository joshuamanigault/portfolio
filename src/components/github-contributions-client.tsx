"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// Track mount state without useEffect + setState
const emptySubscribe = () => () => {};

// Custom green base color for the chart - balanced (not too neon, not too dull)
const CHART_COLOR_LIGHT = "40a050"; // vibrant but not neon green
const CHART_COLOR_DARK = "4aba5a"; // brighter for dark mode visibility

// Legend colors matching the shades the API generates from our base color
const LEGEND_COLORS_LIGHT = [
  "#ebedf0", // no contributions (GitHub's default empty color)
  "#b8e4b8", // lightest shade
  "#7ac87a", // light shade
  "#50b050", // medium shade
  "#40a050", // base color (most contributions)
];

const LEGEND_COLORS_DARK = [
  "#1a1a1a", // no contributions (dark background)
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
  const chartColor = isDark ? CHART_COLOR_DARK : CHART_COLOR_LIGHT;
  const chartUrl = `https://ghchart.rshah.org/${chartColor}/${username}`;

  return (
    <div className="border-border bg-card overflow-x-auto rounded-lg border p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chartUrl}
        alt={`${username}'s GitHub contribution graph`}
        className="w-full min-w-[700px]"
        loading="lazy"
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
  const legendColors = isDark ? LEGEND_COLORS_DARK : LEGEND_COLORS_LIGHT;

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
