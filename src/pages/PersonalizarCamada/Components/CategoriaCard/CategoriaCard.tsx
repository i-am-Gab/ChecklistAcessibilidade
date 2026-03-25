import { CircleCheck } from "lucide-react";
import styles from "./CategoriaCard.module.css";

interface CategoriaCardProps {
  nome: string;
  descricao: string;
  selecionada: boolean;
  onClick: () => void;
  IconComponent?: React.ElementType;
}

export function CategoriaCard({
  nome,
  descricao,
  selecionada,
  onClick,
  IconComponent,
}: CategoriaCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.card} ${selecionada ? styles.selected : ""}`}
    >
      {selecionada && (
        <div className={styles.cardCheckmark}>
          <CircleCheck size={24} fill="#00b894" color="white" />
        </div>
      )}

      {IconComponent && (
        <div
          className={`${styles.cardIconContainer} ${
            selecionada ? styles.selected : ""
          }`}
        >
          <IconComponent
            className={`${styles.cardIcon} ${
              selecionada ? styles.selected : ""
            }`}
          />
        </div>
      )}

      <h3 className={styles.cardTitle}>{nome}</h3>

      <p className={styles.cardDescription}>{descricao}</p>
    </button>
  );
}