"use client";

import { useCallback, useRef, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  emptyMessageInput,
  normaliseMessageInput,
  useMessages,
  validateMessage,
} from "@/lib/messages";
import type { FieldErrors, Message, MessageInput } from "@/lib/messages";
import { MessageForm } from "@/components/contact/message-form";
import { DraftList } from "@/components/contact/draft-list";

/**
 * Contact CRUD surface.
 *
 * create → "Save draft"
 * read   → the saved list below the form
 * update → "Edit" loads a record back into the form
 * delete → "Delete" / "Clear all"
 *
 * Storage is swapped behind `MessageRepository`, so wiring a real API later
 * does not touch this component.
 */
export function ContactBoard() {
  const { messages, isHydrated, create, update, remove, clear } = useMessages();
  const [input, setInput] = useState<MessageInput>(emptyMessageInput);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const isEditing = editingId !== null;

  const handleChange = useCallback((patch: Partial<MessageInput>) => {
    setInput((current) => ({ ...current, ...patch }));
    // Clearing the error for a field the moment it is edited keeps the form calm.
    setErrors((current) => {
      const next = { ...current };
      for (const key of Object.keys(patch) as Array<keyof MessageInput>) {
        delete next[key];
      }
      return next;
    });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateMessage(input);

    if (!result.valid) {
      setErrors(result.errors);
      setNotice(null);
      return;
    }

    const normalised = normaliseMessageInput(input);

    if (editingId) {
      update(editingId, normalised);
      setNotice("Draft updated.");
    } else {
      create(normalised);
      setNotice("Draft saved. Open it in your email client when you are ready.");
    }

    setInput(emptyMessageInput);
    setErrors({});
    setEditingId(null);
  };

  const handleEdit = (message: Message) => {
    setInput({
      name: message.name,
      email: message.email,
      projectType: message.projectType,
      body: message.body,
    });
    setErrors({});
    setEditingId(message.id);
    setNotice(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleDelete = (id: string) => {
    remove(id);
    if (editingId === id) {
      setEditingId(null);
      setInput(emptyMessageInput);
    }
    setNotice("Draft deleted.");
  };

  const handleClear = () => {
    clear();
    setEditingId(null);
    setInput(emptyMessageInput);
    setNotice("All local drafts cleared.");
  };

  return (
    <div className="flex flex-col gap-10">
      <div ref={formRef} className="card p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-bone text-lg">
            {isEditing ? "Editing a saved draft" : "Tell me about the problem"}
          </h2>
          <p className="text-mist text-[13px] leading-relaxed">
            Five fields, no gatekeeping. Save it as a draft now and send it when you are ready.
          </p>
        </div>

        <MessageForm
          value={input}
          errors={errors}
          isEditing={isEditing}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingId(null);
            setInput(emptyMessageInput);
            setErrors({});
          }}
        />

        <p aria-live="polite" className="text-rose mt-5 min-h-5 text-[12.5px]">
          {notice ? (
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5" aria-hidden />
              {notice}
            </span>
          ) : null}
        </p>
      </div>

      <DraftList
        messages={messages}
        isHydrated={isHydrated}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClear={handleClear}
      />
    </div>
  );
}
