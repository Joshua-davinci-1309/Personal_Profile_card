import { MESSAGES_STORAGE_KEY } from "./local-repository";
import type { MessageRepository } from "./repository";
import type { Message, MessageInput, MessageStatus } from "./types";

/**
 * A tiny observable store wrapped around a `MessageRepository`.
 *
 * Why a store instead of `useState` + `useEffect`: reading `localStorage` during
 * render breaks hydration, and setting state inside an effect triggers a
 * cascading render (React's `set-state-in-effect` lint rule exists for a reason).
 * A snapshot store consumed through `useSyncExternalStore` is the supported
 * pattern for external, browser-only data — and it gets cross-tab updates for free.
 */
export interface MessageStore {
  subscribe(listener: () => void): () => void;
  getSnapshot(): Message[];
  create(input: MessageInput): Message | undefined;
  update(
    id: string,
    patch: Partial<MessageInput> & { status?: MessageStatus },
  ): Message | undefined;
  remove(id: string): void;
  clear(): void;
}

export const EMPTY_MESSAGES: Message[] = [];

export function createMessageStore(resolveRepository: () => MessageRepository): MessageStore {
  const listeners = new Set<() => void>();
  let repository: MessageRepository | null = null;
  let snapshot: Message[] = EMPTY_MESSAGES;
  let isStarted = false;

  const repo = (): MessageRepository => {
    repository ??= resolveRepository();
    return repository;
  };

  const refresh = (): void => {
    snapshot = repo().list();
    for (const listener of listeners) listener();
  };

  const handleStorage = (event: StorageEvent): void => {
    if (event.key === MESSAGES_STORAGE_KEY) refresh();
  };

  return {
    subscribe(listener) {
      listeners.add(listener);

      if (!isStarted) {
        isStarted = true;
        window.addEventListener("storage", handleStorage);
        refresh();
      }

      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          window.removeEventListener("storage", handleStorage);
          isStarted = false;
        }
      };
    },

    getSnapshot: () => snapshot,

    create(input) {
      const message = repo().create(input);
      refresh();
      return message;
    },

    update(id, patch) {
      const message = repo().update(id, patch);
      refresh();
      return message;
    },

    remove(id) {
      repo().remove(id);
      refresh();
    },

    clear() {
      repo().clear();
      refresh();
    },
  };
}
