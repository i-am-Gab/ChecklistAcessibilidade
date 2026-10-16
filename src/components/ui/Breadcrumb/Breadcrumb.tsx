import { ArrowLeft } from "lucide-react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onBack?: () => void;
  backLabel?: string;
}

export function Breadcrumb({
  items,
  onBack,
  backLabel = "Voltar",
}: BreadcrumbProps) {
  return (
    <nav className={styles.wrapper} aria-label="Caminho de navegação">
      <div className={styles.breadcrumb}>
        {items.map((item, index) => (
          <span key={index} className={styles.itemWrapper}>
            {item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className={styles.link}
              >
                {item.label}
              </button>
            ) : (
              <span className={styles.current} aria-current={index === items.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <span className={styles.separator} aria-hidden="true">›</span>
            )}
          </span>
        ))}
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={styles.backButton}
        >
          <ArrowLeft className={styles.backIcon} />
          {backLabel}
        </button>
      )}
    </nav>
  );
}
