export const coverColorMap: Record<string, { bg: string; text: string; border: string }> = {
  signal: { bg: "bg-signal", text: "text-ink", border: "border-signal-dark" },
  poster: { bg: "bg-poster", text: "text-paper-light", border: "border-poster-dark" },
  moss: { bg: "bg-moss", text: "text-paper-light", border: "border-moss" },
  ink: { bg: "bg-ink", text: "text-paper-light", border: "border-ink" },
};

export function getCoverColor(key: string) {
  return coverColorMap[key] ?? coverColorMap.signal;
}
