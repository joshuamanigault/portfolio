"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import styles from "./github-contributions.module.css";

type Day = { date: string; count: number; level: number };
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const lightColors = ["#ebedf0", "#b8e4b8", "#7ac87a", "#50b050", "#40a050"];
const darkColors = ["#1a1a1a", "#2a5a2a", "#3a7a3a", "#4aba5a", "#5ada6a"];

export function GitHubContributionsChart({ username }: { username: string }) {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "dark" ? darkColors : lightColors;
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const [days, setDays] = useState<Day[] | null>(null);
  const [error, setError] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [focusedDate, setFocusedDate] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<(Day & { left: number; top: number }) | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();
    // Same public data source used by react-github-calendar.
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { signal: controller.signal }
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("Contribution request failed");
        const data = await response.json();
        if (
          !Array.isArray(data.contributions) ||
          !data.contributions.length ||
          !data.contributions.every(
            (day: Day) =>
              /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
              Number.isInteger(day.count) &&
              day.count >= 0 &&
              Number.isInteger(day.level) &&
              day.level >= 0 &&
              day.level <= 4
          )
        ) {
          throw new Error("Invalid contribution data");
        }
        if (!controller.signal.aborted) {
          setDays(data.contributions);
          setError(false);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, [username]);

  useEffect(() => {
    const dismiss = () => setTooltip(null);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    const outside = (event: PointerEvent) => {
      if (!chartRef.current?.contains(event.target as Node)) dismiss();
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  useEffect(() => {
    if (!days || !chartRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, [days]);

  if (error)
    return (
      <p className="text-muted text-sm">
        Contributions are unavailable right now.{" "}
        <a className="underline" href={`https://github.com/${username}`}>
          View GitHub profile
        </a>
      </p>
    );
  if (!days)
    return <div className={styles.placeholder} aria-label="Loading contributions" />;

  // Preserve Sunday-to-Saturday columns, including the partial first week.
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const slots: (Day | null)[] = [...Array<null>(offset).fill(null), ...days];
  const weeks = Array.from({ length: Math.ceil(slots.length / 7) }, (_, index) =>
    slots.slice(index * 7, index * 7 + 7)
  );
  const showTooltip = (element: HTMLButtonElement, day: Day) => {
    const rect = element.getBoundingClientRect();
    setTooltip({
      ...day,
      left: Math.max(
        8,
        Math.min(
          rect.left + rect.width / 2 - 100,
          document.documentElement.clientWidth - 208
        )
      ),
      top: rect.top > 100 ? rect.top - 90 : rect.bottom + 12,
    });
  };

  return (
    <div ref={chartRef} className={styles.chart} data-revealed={revealed}>
      <div
        className={styles.weeks}
        aria-label="Daily GitHub contributions. Use arrow keys to explore days."
        onPointerLeave={() => setTooltip(null)}
      >
        {weeks.map((week, weekIndex) => (
          <div
            className={styles.week}
            key={week.find(Boolean)!.date}
            style={{ "--reveal-delay": `${weekIndex * 18}ms` } as CSSProperties}
          >
            {week.map((day, dayIndex) =>
              day ? (
                <button
                  key={day.date}
                  type="button"
                  className={styles.day}
                  data-date={day.date}
                  style={{ backgroundColor: colors[day.level] }}
                  tabIndex={day.date === (focusedDate ?? days[0].date) ? 0 : -1}
                  aria-label={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${dateFormatter.format(new Date(`${day.date}T00:00:00Z`))}`}
                  aria-describedby={tooltip?.date === day.date ? tooltipId : undefined}
                  onPointerEnter={(event) => showTooltip(event.currentTarget, day)}
                  onClick={(event) => showTooltip(event.currentTarget, day)}
                  onFocus={(event) => {
                    setFocusedDate(day.date);
                    showTooltip(event.currentTarget, day);
                  }}
                  onBlur={() => setTooltip(null)}
                  onKeyDown={(event) => {
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
                    const target = new Date(`${day.date}T00:00:00Z`);
                    target.setUTCDate(target.getUTCDate() + offsets[event.key]);
                    chartRef.current
                      ?.querySelector<HTMLButtonElement>(
                        `[data-date="${target.toISOString().slice(0, 10)}"]`
                      )
                      ?.focus();
                  }}
                />
              ) : (
                <span key={`empty-${dayIndex}`} aria-hidden="true" />
              )
            )}
          </div>
        ))}
      </div>
      <p className={styles.total}>
        {days.reduce((sum, day) => sum + day.count, 0).toLocaleString()} contributions in
        the last year
      </p>
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
