"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";
import type { FormEvent } from "react";
import { projectTypeLabels, projectTypes, LIMITS } from "@/lib/messages";
import type { FieldErrors, MessageInput } from "@/lib/messages";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface MessageFormProps {
  value: MessageInput;
  errors: FieldErrors;
  isEditing: boolean;
  onChange: (patch: Partial<MessageInput>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const fieldClass =
  "w-full rounded-xl border bg-canvas/60 px-4 py-3 text-sm text-bone placeholder:text-stone " +
  "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose/40";

/** Presentational only — validation and persistence live in the parent. */
export function MessageForm({
  value,
  errors,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: MessageFormProps) {
  const id = useId();
  const fieldId = (name: string) => `${id}-${name}`;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={fieldId("name")}
            className="text-stone text-[12px] tracking-[0.12em] uppercase"
          >
            Name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            value={value.name}
            onChange={(event) => onChange({ name: event.target.value })}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? fieldId("name-error") : undefined}
            placeholder="Your name"
            className={cn(fieldClass, errors.name ? "border-rose/70" : "border-line")}
          />
          {errors.name ? (
            <p id={fieldId("name-error")} className="text-rose text-[12px]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={fieldId("email")}
            className="text-stone text-[12px] tracking-[0.12em] uppercase"
          >
            Email
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            value={value.email}
            onChange={(event) => onChange({ email: event.target.value })}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? fieldId("email-error") : undefined}
            placeholder="you@company.com"
            className={cn(fieldClass, errors.email ? "border-rose/70" : "border-line")}
          />
          {errors.email ? (
            <p id={fieldId("email-error")} className="text-rose text-[12px]">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={fieldId("type")}
          className="text-stone text-[12px] tracking-[0.12em] uppercase"
        >
          What do you need?
        </label>
        <div className="relative">
          <select
            id={fieldId("type")}
            name="projectType"
            value={value.projectType}
            onChange={(event) =>
              onChange({ projectType: event.target.value as MessageInput["projectType"] })
            }
            className={cn(fieldClass, "border-line appearance-none pr-11")}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-canvas text-bone">
                {projectTypeLabels[type]}
              </option>
            ))}
          </select>
          <ChevronDown
            className="text-stone pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor={fieldId("body")}
            className="text-stone text-[12px] tracking-[0.12em] uppercase"
          >
            The problem
          </label>
          <span className="text-stone font-mono text-[11px]">
            {value.body.length}/{LIMITS.body.max}
          </span>
        </div>
        <textarea
          id={fieldId("body")}
          name="body"
          rows={6}
          value={value.body}
          onChange={(event) => onChange({ body: event.target.value })}
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? fieldId("body-error") : undefined}
          placeholder="What is manual, slow or breaking? Who uses it, and what would a good day look like?"
          className={cn(fieldClass, "resize-y", errors.body ? "border-rose/70" : "border-line")}
        />
        {errors.body ? (
          <p id={fieldId("body-error")} className="text-rose text-[12px]">
            {errors.body}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          {isEditing ? "Save changes" : "Save draft"}
        </Button>
        {isEditing ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel edit
          </Button>
        ) : null}
      </div>

      <p className="text-stone text-[11.5px] leading-relaxed">
        Drafts are stored in this browser only. Nothing is transmitted until you open the composed
        email — no tracking, no server, no surprises.
      </p>
    </form>
  );
}
