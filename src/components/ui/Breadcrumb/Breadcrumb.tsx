import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  to?: string;
  state?: unknown;
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
      <ol className={styles.breadcrumb}>
        {items.map((item, index) => (
          <li key={index} className={styles.itemWrapper}>
            {item.to ? (
              <Link
                to={item.to}
                state={item.state}
                className={styles.link}
              >
                {item.label}
              </Link>
            ) : (
              <span className={styles.current} aria-current={index === items.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <span className={styles.separator} aria-hidden="true">›</span>
            )}
          </li>
        ))}
      </ol>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={styles.backButton}
        >
          <ArrowLeft className={styles.backIcon} aria-hidden="true" />
          {backLabel}
        </button>
      )}
    </nav>
  );
}
