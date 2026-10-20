"use client";

import { useTheme } from "next-themes";
import { cloneElement, useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { GitHubCalendar } from "react-github-calendar";
import styles from "./github-contributions.module.css";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

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
  const tooltipId = useId();
  const [tooltip, setTooltip] = useState<{
    date: string;
    count: number;
    left: number;
    top: number;
  } | null>(null);
  const [focusedDate, setFocusedDate] = useState<string | null>(null);
  useEffect(() => {
    const dismiss = () => setTooltip(null);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => {
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, []);
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
      <div className="border-border bg-card rounded-md border p-4">
        <div className="bg-muted min-h-[150px] w-full animate-pulse rounded-sm" />
      </div>
    );
  }

  return (
    <div
      className="border-border bg-card rounded-md border p-4"
      tabIndex={focusedDate ? -1 : 0}
      aria-label="Daily GitHub contributions. Use arrow keys to explore days."
      onFocus={(event) => {
        if (event.target === event.currentTarget)
          event.currentTarget.querySelector<SVGRectElement>("rect[data-date]")?.focus();
      }}
      onPointerLeave={() => setTooltip(null)}
      onScrollCapture={() => setTooltip(null)}
    >
      <GitHubCalendar
        username={username}
        colorScheme={isDark ? "dark" : "light"}
        theme={{
          light: THEME_COLORS_LIGHT,
          dark: THEME_COLORS_DARK,
        }}
        blockSize={11}
        blockMargin={3}
        fontSize={12}
        showColorLegend={false}
        showTotalCount={false}
        renderBlock={(block, activity) => {
          const date = dateFormatter.format(new Date(`${activity.date}T00:00:00Z`));
          const label = `${activity.count} ${activity.count === 1 ? "contribution" : "contributions"}`;
          const showTooltip = (element: SVGRectElement) => {
            const rect = element.getBoundingClientRect();
            setTooltip({
              date: activity.date,
              count: activity.count,
              left: Math.max(
                8,
                Math.min(rect.left + rect.width / 2 - 100, window.innerWidth - 208)
              ),
              top: rect.top > 100 ? rect.top - 90 : rect.bottom + 12,
            });
          };
          return cloneElement(block, {
            className: styles.day,
            tabIndex: focusedDate === activity.date ? 0 : -1,
            "aria-label": `${label} on ${date}`,
            "aria-describedby": tooltip?.date === activity.date ? tooltipId : undefined,
            onPointerEnter: (event) => showTooltip(event.currentTarget),
            onClick: (event) => showTooltip(event.currentTarget),
            onFocus: (event) => {
              setFocusedDate(activity.date);
              showTooltip(event.currentTarget);
            },
            onBlur: () => setTooltip(null),
            onKeyDown: (event) => {
              if (event.key === "Escape") {
                setTooltip(null);
                return;
              }
              const offsets: Record<string, number> = {
                ArrowLeft: -7,
                ArrowRight: 7,
                ArrowUp: -1,
                ArrowDown: 1,
              };
              if (!(event.key in offsets)) return;
              event.preventDefault();
              const target = new Date(`${activity.date}T00:00:00Z`);
              target.setUTCDate(target.getUTCDate() + offsets[event.key]);
              event.currentTarget
                .closest("svg")
                ?.querySelector<SVGRectElement>(
                  `[data-date="${target.toISOString().slice(0, 10)}"]`
                )
                ?.focus();
            },
          });
        }}
      />
      {tooltip &&
        createPortal(
          <div
            id={tooltipId}
            role="tooltip"
            className={styles.tooltip}
            style={{ left: tooltip.left, top: tooltip.top }}
          >
            <strong>
              {tooltip.count} {tooltip.count === 1 ? "contribution" : "contributions"}
            </strong>
            <time dateTime={tooltip.date}>
              {dateFormatter.format(new Date(`${tooltip.date}T00:00:00Z`))}
            </time>
          </div>,
          document.body
        )}
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
