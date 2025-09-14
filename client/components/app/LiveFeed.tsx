import {
  BadgeCheck,
  Circle,
  MessagesSquare,
  Phone,
  Video,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useLiveFeed, Channel } from "@/hooks/use-live-feed";

export default function LiveFeed() {
  const {
    running,
    setRunning,
    events,
    counts,
    filters,
    toggleChannel,
    toggleSeverity,
    resetFilters,
  } = useLiveFeed();

  const Icon = ({ c }: { c: Channel }) =>
    c === "text" ? (
      <MessagesSquare className="text-sky-500" />
    ) : c === "voice" ? (
      <Phone className="text-amber-500" />
    ) : (
      <Video className="text-violet-500" />
    );

  return (
    <section className="container py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Live Fraud Monitor</h2>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-3 text-xs">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" /> Safe
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-500" /> Caution
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Danger
            </span>
          </div>
          <Button variant="outline" onClick={() => setRunning((r) => !r)}>
            {running ? "Pause" : "Resume"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-lg border p-3">
        <div className="flex items-center gap-3 text-sm mb-2">
          <Filter className="text-primary" /> Filters
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            {(["text", "voice", "video"] as const).map((c) => (
              <Button
                key={c}
                variant={filters.channels[c] ? "default" : "outline"}
                size="sm"
                onClick={() => toggleChannel(c)}
              >
                {c}
              </Button>
            ))}
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            {(["low", "medium", "high"] as const).map((s) => (
              <Button
                key={s}
                variant={filters.severities[s] ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSeverity(s)}
              >
                {s}
              </Button>
            ))}
          </div>
          <div className="ms-auto">
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {events.map((e) => (
            <div
              key={e.id + e.channel + e.analysis.score}
              className="rounded-lg border p-4 bg-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon c={e.channel} />
                  <span className="text-sm uppercase text-foreground/60">
                    {e.channel}
                  </span>
                </div>
                <div
                  className={`inline-flex items-center gap-2 text-xs px-2 py-1 rounded ${e.analysis.severity === "high" ? "bg-red-100 text-red-700" : e.analysis.severity === "medium" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {e.analysis.severity === "high" ? (
                    <AlertTriangle />
                  ) : (
                    <BadgeCheck />
                  )}
                  <span>{e.analysis.severity}</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
                {e.content}
              </p>
              {e.analysis.highlights.length > 0 && (
                <div className="mt-3 text-xs text-foreground/80">
                  <span className="font-medium">Flagged phrases:</span>{" "}
                  {e.analysis.highlights.map((h) => (
                    <code
                      key={`${h.phrase}-${h.index}`}
                      className="mx-1 rounded bg-secondary px-1.5 py-0.5"
                    >
                      {h.phrase}
                    </code>
                  ))}
                </div>
              )}
              {e.analysis.reasons.length > 0 && (
                <ul className="mt-3 text-xs list-disc pl-5 text-foreground/80">
                  {e.analysis.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {events.length === 0 && (
            <div className="rounded-lg border p-8 text-center text-sm text-foreground/60">
              No events match the selected filters.
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-3">Alerts by Channel</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart
                data={Object.entries(counts.byChannel).map(([k, v]) => ({
                  name: k,
                  value: v,
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-3">Severity</h3>
            <div className="flex gap-3">
              {(["low", "medium", "high"] as const).map((k) => (
                <div
                  key={k}
                  className="flex-1 rounded bg-secondary p-3 text-center"
                >
                  <div className="text-2xl font-semibold">
                    {counts.bySeverity[k]}
                  </div>
                  <div className="text-xs uppercase text-foreground/60">
                    {k}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Protective Advice</h3>
            <ul className="text-sm list-disc pl-5 text-foreground/80 space-y-1">
              <li>Never share OTPs or passwords.</li>
              <li>Verify caller identity via official channels.</li>
              <li>Avoid clicking shortened or suspicious links.</li>
              <li>Report incidents to official cybercrime portals.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
