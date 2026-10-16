import { getCategoriesForLayer } from "../../data/categories";
import type { ChecklistItem, ChecklistSubItem } from "../../mocks/checklists.mock";
import type { ChecklistSelection } from "./checklistUrl";

type DraftScope = Pick<ChecklistSelection, "layer" | "screen">;
type DraftStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
// Mantém a navegação funcional mesmo quando o navegador bloqueia ou esgota o armazenamento.
const unsavedDrafts = new Map<string, ChecklistItem[]>();

export function getDraftKey({ layer, screen }: DraftScope) {
  return `checklist-acessibilidade:progresso:v1:${layer}:${screen ?? "geral"}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSubItem(value: unknown): value is ChecklistSubItem {
  return isRecord(value) && typeof value.id === "string" &&
    typeof value.text === "string" && typeof value.checked === "boolean";
}

export function readChecklistDraft(scope: DraftScope, storage?: DraftStorage): {
  available: boolean;
  items?: ChecklistItem[];
} {
  try {
    const raw = (storage ?? window.localStorage).getItem(getDraftKey(scope));
    const unsaved = unsavedDrafts.get(getDraftKey(scope));
    if (unsaved) return { available: false, items: unsaved };
    if (!raw) return { available: true };
    const draft: unknown = JSON.parse(raw);
    const categories = new Set<string>(getCategoriesForLayer(scope.layer).map(category => category.id));
    if (!isRecord(draft) || draft.version !== 1 || !Array.isArray(draft.items)) {
      return { available: true };
    }
    const valid = draft.items.every((item: unknown) =>
      isRecord(item) && typeof item.id === "number" && Number.isFinite(item.id) &&
      typeof item.category === "string" && categories.has(item.category) &&
      typeof item.text === "string" && typeof item.checked === "boolean" &&
      (item.subItems === undefined || (Array.isArray(item.subItems) && item.subItems.every(isSubItem))),
    );
    return valid ? { available: true, items: draft.items as ChecklistItem[] } : { available: true };
  } catch (error) {
    // Conteúdo local inválido não impede o uso; bloqueio do armazenamento é informado na tela.
    return { available: error instanceof SyntaxError, items: unsavedDrafts.get(getDraftKey(scope)) };
  }
}

export function saveChecklistDraft(scope: DraftScope, items: ChecklistItem[], storage?: DraftStorage) {
  try {
    const progress = items.map(({ id, category, text, checked, subItems }) => ({
      id, category, text, checked,
      ...(subItems ? { subItems: subItems.map(({ id, text, checked }) => ({ id, text, checked })) } : {}),
    }));
    (storage ?? window.localStorage).setItem(getDraftKey(scope), JSON.stringify({ version: 1, items: progress }));
    unsavedDrafts.delete(getDraftKey(scope));
    return true;
  } catch {
    unsavedDrafts.set(getDraftKey(scope), items);
    return false;
  }
}
