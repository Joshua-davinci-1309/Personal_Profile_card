"use client";

import { Mail, Pencil, Trash2 } from "lucide-react";
import type { Message } from "@/lib/messages";
import { composeEmail, projectTypeLabels } from "@/lib/messages";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

interface DraftListProps {
  messages: Message[];
  isHydrated: boolean;
  onEdit: (message: Message) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

function formatUpdated(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DraftList({ messages, isHydrated, onEdit, onDelete, onClear }: DraftListProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-stone text-[12px] tracking-[0.16em] uppercase">
          Saved on this device
          {isHydrated && messages.length > 0 ? ` · ${messages.length}` : ""}
        </h3>
        {isHydrated && messages.length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-stone hover:text-rose text-[12px] transition-colors"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {!isHydrated ? (
        <p className="border-line text-stone rounded-xl border border-dashed px-4 py-6 text-center text-[12.5px]">
          Loading local drafts…
        </p>
      ) : messages.length === 0 ? (
        <p className="border-line text-stone rounded-xl border border-dashed px-4 py-6 text-center text-[12.5px]">
          Nothing saved yet. Drafts you store here stay private to this browser.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {messages.map((message) => {
            const { href } = composeEmail(message);
            return (
              <li
                key={message.id}
                className={cn(
                  "border-line bg-surface/50 rounded-xl border p-4 transition-colors",
                  "hover:border-line-strong",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-bone truncate text-sm">{message.name}</p>
                    <p className="text-stone mt-0.5 text-[11.5px]">
                      {projectTypeLabels[message.projectType]} · updated{" "}
                      {formatUpdated(message.updatedAt)}
                    </p>
                  </div>
                  <Badge
                    tone={message.status === "queued" ? "accent" : "muted"}
                    className="shrink-0"
                  >
                    {message.status === "queued" ? "Ready" : "Draft"}
                  </Badge>
                </div>

                <p className="text-mist mt-3 line-clamp-2 text-[12.5px] leading-relaxed">
                  {message.body}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(message)}
                    className="text-mist hover:bg-canvas hover:text-bone inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11.5px] transition-colors"
                  >
                    <Pencil className="size-3.5" aria-hidden />
                    Edit
                  </button>
                  <a
                    href={href}
                    className="text-mist hover:bg-canvas hover:text-rose inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11.5px] transition-colors"
                  >
                    <Mail className="size-3.5" aria-hidden />
                    Open in email
                  </a>
                  <button
                    type="button"
                    onClick={() => onDelete(message.id)}
                    className="text-stone hover:bg-canvas hover:text-rose ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11.5px] transition-colors"
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
