import type { Message, MessageInput, MessageStatus } from "./types";
import { isProjectType } from "./validation";
import type { MessageRepository } from "./repository";

export const MESSAGES_STORAGE_KEY = "jm.portfolio.messages.v1";
export const MESSAGES_STORAGE_EVENT = "storage";

/** Narrow unknown JSON into a Message. Guards against stale or hand-edited storage. */
function isMessage(value: unknown): value is Message {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    isProjectType(record.projectType) &&
    typeof record.body === "string" &&
    (record.status === "draft" || record.status === "queued") &&
    typeof record.createdAt === "string" &&
    typeof record.updatedAt === "string"
  );
}

function createId(): string {
  const cryptoObject = globalThis.crypto;
  if (cryptoObject && typeof cryptoObject.randomUUID === "function") {
    return cryptoObject.randomUUID();
  }
  return `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function newestFirst(a: Message, b: Message): number {
  return b.updatedAt.localeCompare(a.updatedAt);
}

/**
 * localStorage-backed repository.
 *
 * Every read is defensive: a corrupted payload or a browser with storage
 * disabled must degrade to "no drafts", never to a crashed page.
 */
export function createLocalMessageRepository(storage: Storage): MessageRepository {
  function readAll(): Message[] {
    try {
      const raw = storage.getItem(MESSAGES_STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isMessage).sort(newestFirst);
    } catch {
      return [];
    }
  }

  function writeAll(messages: Message[]): void {
    try {
      storage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage full or blocked (private mode): the UI still holds state in memory.
    }
  }

  return {
    key: MESSAGES_STORAGE_KEY,

    list: readAll,

    get(id) {
      return readAll().find((message) => message.id === id);
    },

    create(input: MessageInput) {
      const timestamp = new Date().toISOString();
      const message: Message = {
        id: createId(),
        ...input,
        status: "draft",
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      writeAll([message, ...readAll()]);
      return message;
    },

    update(id, patch: Partial<MessageInput> & { status?: MessageStatus }) {
      const messages = readAll();
      const index = messages.findIndex((message) => message.id === id);
      const current = messages[index];
      if (!current) return undefined;

      const updated: Message = {
        ...current,
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      messages[index] = updated;
      writeAll(messages);
      return updated;
    },

    remove(id) {
      writeAll(readAll().filter((message) => message.id !== id));
    },

    clear() {
      writeAll([]);
    },
  };
}
