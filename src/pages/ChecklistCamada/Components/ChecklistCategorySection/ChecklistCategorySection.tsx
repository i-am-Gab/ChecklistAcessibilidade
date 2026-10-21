import { ChevronDown, Image, Settings } from "lucide-react";
import { useId, useState } from "react";
import type {
  ChecklistCategory,
  ChecklistItem,
} from "../../../../mocks/checklists.mock";
import type { CamadaId } from "../../checklist.config";
import styles from "./ChecklistCategorySection.module.css";
import { calculateProgress } from "../../checklist.utils";
import { getCategory } from "../../../../data/categories";

type ChecklistCategorySectionProps = {
  category: ChecklistCategory;
  categoryItems: ChecklistItem[];
  layerId: CamadaId;
  imageUrls?: Record<string | number, string>;
  onToggleCategory: (category: ChecklistCategory) => void;
  onToggleItem: (itemId: number) => void;
  onToggleSubItem: (itemId: number, subItemId: string) => void;
  onOpenVariations?: (
    type: "Visualização" | "Busca",
  ) => void;
  renderTextWithColorIndicator: (
    text: string,
    colorIndicator?: string,
  ) => React.ReactNode;
};

export default function ChecklistCategorySection({
  category,
  categoryItems,
  layerId,
  imageUrls = {},
  onToggleCategory,
  onToggleItem,
  onToggleSubItem,
  onOpenVariations,
  renderTextWithColorIndicator,
}: ChecklistCategorySectionProps) {
  const [expanded, setExpanded] = useState(true);
  const sectionId = useId();
  const categoryCompleted = categoryItems.filter(
    (item) => item.checked,
  ).length;

  const categoryTotal = categoryItems.length;
  const leafProgress = calculateProgress(categoryItems);

  const categoryName = getCategory(category).nome;
  const categoryImageKey = `categoria-${category}`;

  return (
    <section className={styles.categoryCard}>
      <div className={styles.categorySummary}>
        <div className={styles.categorySummaryContent}>
          <input
            type="checkbox"
            checked={leafProgress.totalItems > 0 && leafProgress.completedItems === leafProgress.totalItems}
            ref={(input) => { if (input) input.indeterminate = leafProgress.completedItems > 0 && leafProgress.completedItems < leafProgress.totalItems; }}
            aria-label={`Marcar todos os itens de ${categoryName}`}
            onChange={() => onToggleCategory(category)}
            onClick={(e) => e.stopPropagation()}
            className={styles.checkbox}
          />

          <h2 className={styles.categoryTitle}>
            <button type="button" className={styles.categoryToggle} aria-expanded={expanded} aria-controls={`${sectionId}-items`} onClick={() => setExpanded((value) => !value)}>
              {categoryName} <span className={styles.categoryCounter}>({categoryCompleted}/{categoryTotal})</span>
              <ChevronDown className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ""}`} aria-hidden="true" />
            </button>
          </h2>

          {layerId === 3 && imageUrls[categoryImageKey] && (
            <a
              href={imageUrls[categoryImageKey]}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={styles.categoryPrintButton}
              aria-label={`Ver Print de ${categoryName} (abre em nova aba)`}
            >
              <Image className={styles.categoryPrintIcon} aria-hidden="true" />
              <span className={styles.desktopOnly}>Ver Print</span>
            </a>
          )}

          {layerId === 3 &&
            category === "tela-visualizacao" && (
              <button
                type="button"
                aria-label="Configurar variação da Tela de Visualização"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenVariations?.("Visualização");
                }}
                className={styles.variationButton}
              >
                <Settings className={styles.variationIcon} aria-hidden="true" />
                <span className={styles.desktopOnly}>
                  Configurar Variação
                </span>
              </button>
            )}

          {layerId === 3 &&
            category === "tela-busca" && (
              <button
                type="button"
                aria-label="Configurar variação da Tela de Busca/Listagem"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenVariations?.("Busca");
                }}
                className={styles.variationButton}
              >
                <Settings className={styles.variationIcon} aria-hidden="true" />
                <span className={styles.desktopOnly}>
                  Configurar Variação
                </span>
              </button>
            )}
        </div>

      </div>

      <div id={`${sectionId}-items`} hidden={!expanded} className={styles.itemsWrapper}>
        {categoryItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.itemCard} ${
              item.checked
                ? styles.itemCardChecked
                : styles.itemCardUnchecked
            }`}
          >
            <div className={styles.itemLabel}>
              <input
                type="checkbox"
                checked={item.checked}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = !!item.subItems?.some((subItem) => subItem.checked)
                      && !item.subItems.every((subItem) => subItem.checked);
                  }
                }}
                onChange={() => onToggleItem(item.id)}
                className={styles.checkbox}
                id={`${sectionId}-item-${item.id}`}
                aria-describedby={item.description ? `${sectionId}-description-${item.id}` : undefined}
              />

              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <label htmlFor={`${sectionId}-item-${item.id}`}
                    className={`${styles.itemTitle} ${
                      item.checked ? styles.itemTitleChecked : ""
                    }`}
                  >
                    {layerId === 3
                      ? renderTextWithColorIndicator(
                          item.text,
                          item.colorIndicator,
                        )
                      : item.text}
                  </label>

                  {layerId === 3 && imageUrls[item.id] && (
                    <a
                      href={imageUrls[item.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={styles.itemPrintButton}
                      aria-label={`Ver Print de ${item.text} (abre em nova aba)`}
                    >
                      <Image className={styles.itemPrintIcon} aria-hidden="true" />
                      <span className={styles.desktopOnly}>
                        Ver Print
                      </span>
                    </a>
                  )}
                </div>

                {item.description && (
                  <div id={`${sectionId}-description-${item.id}`} className={styles.itemDescription}>
                    {item.description}
                  </div>
                )}

                {item.subItems && (
                  <div className={styles.subItemsWrapper}>
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.id}
                        className={`${styles.subItemCard} ${
                          subItem.checked
                            ? styles.subItemCardChecked
                            : styles.subItemCardUnchecked
                        }`}
                      >
                        <label className={styles.subItemLabel}>
                          <input
                            type="checkbox"
                            aria-labelledby={`${sectionId}-subitem-${subItem.id}`}
                            aria-describedby={subItem.description ? `${sectionId}-subdescricao-${subItem.id}` : undefined}
                            checked={subItem.checked}
                            onChange={() =>
                              onToggleSubItem(item.id, subItem.id)
                            }
                            className={styles.checkbox}
                          />

                          <div className={styles.subItemContent}>
                            <div
                              id={`${sectionId}-subitem-${subItem.id}`}
                              className={`${styles.subItemTitle} ${
                                subItem.checked
                                  ? styles.subItemTitleChecked
                                  : ""
                              }`}
                            >
                              {renderTextWithColorIndicator(
                                subItem.text,
                                subItem.colorIndicator,
                              )}
                            </div>

                            {subItem.description && (
                              <div id={`${sectionId}-subdescricao-${subItem.id}`} className={styles.subItemDescription}>
                                {subItem.description}
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
