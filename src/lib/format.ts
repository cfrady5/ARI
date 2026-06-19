/** Shared formatting helpers. */

/** Format an ISO date string as e.g. "May 28, 2026". */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
