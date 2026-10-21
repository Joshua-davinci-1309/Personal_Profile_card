import type { Message, MessageInput, MessageStatus } from "./types";

/**
 * Persistence contract for the contact module.
 *
 * Today the only implementation is `createLocalMessageRepository` (localStorage),
 * which keeps the site deployable as static files. When the API exists, drop in
 * a `createHttpMessageRepository(fetch)` that satisfies this same interface and
 * nothing in the UI changes — that is the whole point of the boundary.
 */
export interface MessageRepository {
  readonly key: string;
  list(): Message[];
  get(id: string): Message | undefined;
  create(input: MessageInput): Message;
  update(
    id: string,
    patch: Partial<MessageInput> & { status?: MessageStatus },
  ): Message | undefined;
  remove(id: string): void;
  clear(): void;
}
