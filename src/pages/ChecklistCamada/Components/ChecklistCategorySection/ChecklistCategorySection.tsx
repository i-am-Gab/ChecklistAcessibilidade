import { ChevronDown, Image, Settings } from "lucide-react";
import { useId, useState } from "react";
import type {
  ChecklistCategory,
  ChecklistItem,
} from "../../../../mocks/checklists.mock";
import type { CamadaId } from "../../checklist.config";
import styles from "./ChecklistCategorySection.module.css";

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
  normalizeCategoryKey: (category: string) => string;
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
  normalizeCategoryKey,
  renderTextWithColorIndicator,
}: ChecklistCategorySectionProps) {
  const [expanded, setExpanded] = useState(true);
  const sectionId = useId();
  const categoryCompleted = categoryItems.filter(
    (item) => item.checked,
  ).length;

  const categoryTotal = categoryItems.length;

  const categoryImageKey = `categoria-${normalizeCategoryKey(
    category,
  )}`;

  return (
    <section className={styles.categoryCard}>
      <div className={styles.categorySummary}>
        <div className={styles.categorySummaryContent}>
          <input
            type="checkbox"
            checked={categoryCompleted === categoryTotal}
            ref={(input) => { if (input) input.indeterminate = categoryCompleted > 0 && categoryCompleted < categoryTotal; }}
            aria-label={`Marcar todos os itens de ${category}`}
            onChange={() => onToggleCategory(category)}
            onClick={(e) => e.stopPropagation()}
            className={styles.checkbox}
          />

          <h2 className={styles.categoryTitle}>
            <button type="button" className={styles.categoryToggle} aria-expanded={expanded} aria-controls={`${sectionId}-items`} onClick={() => setExpanded((value) => !value)}>
              {category} <span className={styles.categoryCounter}>({categoryCompleted}/{categoryTotal})</span>
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
              aria-label={`Ver imagem de ${category} (abre em nova aba)`}
            >
              <Image className={styles.categoryPrintIcon} />
              <span className={styles.desktopOnly}>Ver Print</span>
            </a>
          )}

          {layerId === 3 &&
            category === "Tela de Visualização" && (
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
                <Settings className={styles.variationIcon} />
                <span className={styles.desktopOnly}>
                  Configurar Variação
                </span>
              </button>
            )}

          {layerId === 3 &&
            category === "Tela de Busca/Listagem" && (
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
                <Settings className={styles.variationIcon} />
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
                      aria-label={`Ver imagem de ${item.text} (abre em nova aba)`}
                    >
                      <Image className={styles.itemPrintIcon} />
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
                            checked={subItem.checked}
                            onChange={() =>
                              onToggleSubItem(item.id, subItem.id)
                            }
                            className={styles.checkbox}
                          />

                          <div className={styles.subItemContent}>
                            <div
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
                              <div className={styles.subItemDescription}>
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
