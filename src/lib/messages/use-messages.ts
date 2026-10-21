"use client";

import { useCallback, useSyncExternalStore } from "react";
import { createLocalMessageRepository } from "./local-repository";
import { createMessageStore, EMPTY_MESSAGES, type MessageStore } from "./store";
import type { Message, MessageInput, MessageStatus } from "./types";

export interface UseMessages {
  messages: Message[];
  /** False on the server and during hydration, true once the client snapshot is live. */
  isHydrated: boolean;
  create: (input: MessageInput) => Message | undefined;
  update: (
    id: string,
    patch: Partial<MessageInput> & { status?: MessageStatus },
  ) => Message | undefined;
  remove: (id: string) => void;
  clear: () => void;
}

/** One store per tab; `subscribe` only runs on the client, so `window` is safe here. */
let store: MessageStore | null = null;

function getStore(): MessageStore {
  store ??= createMessageStore(() => createLocalMessageRepository(window.localStorage));
  return store;
}

export function useMessages(): UseMessages {
  const subscribe = useCallback((listener: () => void) => getStore().subscribe(listener), []);
  const getSnapshot = useCallback(() => getStore().getSnapshot(), []);
  const getServerSnapshot = useCallback(() => EMPTY_MESSAGES, []);

  const messages = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Same store, constant snapshot: flips to `true` only once hydration completes.
  const isHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const create = useCallback((input: MessageInput) => getStore().create(input), []);
  const update = useCallback(
    (id: string, patch: Partial<MessageInput> & { status?: MessageStatus }) =>
      getStore().update(id, patch),
    [],
  );
  const remove = useCallback((id: string) => getStore().remove(id), []);
  const clear = useCallback(() => getStore().clear(), []);

  return { messages, isHydrated, create, update, remove, clear };
}
