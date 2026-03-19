import {
  checklistsMock,
  getChecklistCamada03Items,
  type ChecklistCategory,
  type ChecklistItem,
  type VariacaoTelaBusca,
  type VariacaoTelaVisualizacao,
} from "../../mocks/checklists.mock";
import type { CamadaId } from "./checklist.config";

export function getChecklistItemsByLayer(
  camadaId: CamadaId,
  variacaoTelaBusca: VariacaoTelaBusca,
  variacaoTelaVisualizacao: VariacaoTelaVisualizacao,
): ChecklistItem[] {
  if (camadaId === 3) {
    return getChecklistCamada03Items(
      variacaoTelaBusca,
      variacaoTelaVisualizacao,
    );
  }

  return checklistsMock[camadaId].items;
}

export function getChecklistImageUrlsByLayer(
  camadaId: CamadaId,
) {
  return camadaId === 3
    ? checklistsMock[3].imageUrls ?? {}
    : {};
}

export function groupItemsByCategory(items: ChecklistItem[]) {
  return items.reduce<Record<ChecklistCategory, ChecklistItem[]>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<ChecklistCategory, ChecklistItem[]>,
  );
}

export function filterCategories(
  groupedItems: Record<ChecklistCategory, ChecklistItem[]>,
  categoriasSelecionadas?: ChecklistCategory[],
) {
  if (!categoriasSelecionadas?.length) return groupedItems;

  return Object.fromEntries(
    Object.entries(groupedItems).filter(([category]) =>
      categoriasSelecionadas.includes(
        category as ChecklistCategory,
      ),
    ),
  ) as Record<ChecklistCategory, ChecklistItem[]>;
}

export function calculateProgress(items: ChecklistItem[]) {
  let totalItems = 0;
  let completedItems = 0;

  items.forEach((item) => {
    if (item.subItems?.length) {
      totalItems += item.subItems.length;
      completedItems += item.subItems.filter(
        (subItem) => subItem.checked,
      ).length;
    } else {
      totalItems += 1;
      if (item.checked) completedItems += 1;
    }
  });

  const progress = Math.round(
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0,
  );

  return {
    totalItems,
    completedItems,
    progress,
  };
}

export function toggleChecklistItem(
  items: ChecklistItem[],
  itemId: number,
) {
  return items.map((item) => {
    if (item.id !== itemId) return item;

    const newChecked = !item.checked;

    if (item.subItems) {
      return {
        ...item,
        checked: newChecked,
        subItems: item.subItems.map((subItem) => ({
          ...subItem,
          checked: newChecked,
        })),
      };
    }

    return {
      ...item,
      checked: newChecked,
    };
  });
}

export function toggleChecklistSubItem(
  items: ChecklistItem[],
  itemId: number,
  subItemId: string,
) {
  return items.map((item) => {
    if (item.id !== itemId || !item.subItems) return item;

    const updatedSubItems = item.subItems.map((subItem) =>
      subItem.id === subItemId
        ? { ...subItem, checked: !subItem.checked }
        : subItem,
    );

    return {
      ...item,
      subItems: updatedSubItems,
      checked: updatedSubItems.every((subItem) => subItem.checked),
    };
  });
}

export function toggleChecklistCategory(
  items: ChecklistItem[],
  category: ChecklistCategory,
) {
  const categoryItems = items.filter(
    (item) => item.category === category,
  );

  const allChecked = categoryItems.every((item) => item.checked);

  return items.map((item) => {
    if (item.category !== category) return item;

    if (item.subItems) {
      return {
        ...item,
        checked: !allChecked,
        subItems: item.subItems.map((subItem) => ({
          ...subItem,
          checked: !allChecked,
        })),
      };
    }

    return {
      ...item,
      checked: !allChecked,
    };
  });
}

export function normalizeCategoryKey(category: string) {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/\//g, "");
}