import { useId } from "react";
import styles from "./CategoriaCard.module.css";

interface CategoriaCardProps {
  nome: string;
  descricao: string;
  selecionada: boolean;
  onChange: () => void;
  IconComponent?: React.ElementType;
}

export function CategoriaCard({
  nome,
  descricao,
  selecionada,
  onChange,
  IconComponent,
}: CategoriaCardProps) {
  const id = useId();
  return (
    <label
      className={`${styles.card} ${selecionada ? styles.selected : ""}`}
    >
      <input type="checkbox" className={styles.checkbox} checked={selecionada} onChange={onChange} aria-labelledby={`${id}-nome`} aria-describedby={`${id}-descricao`} />

      {IconComponent && (
        <div
          className={`${styles.cardIconContainer} ${
            selecionada ? styles.selected : ""
          }`}
        >
          <IconComponent
            aria-hidden="true"
            className={`${styles.cardIcon} ${
              selecionada ? styles.selected : ""
            }`}
          />
        </div>
      )}

      <span id={`${id}-nome`} className={styles.cardTitle}>{nome}</span>

      <span id={`${id}-descricao`} className={styles.cardDescription}>{descricao}</span>
    </label>
  );
}
