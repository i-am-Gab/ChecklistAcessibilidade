import styles from "./CamadaCard.module.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export function CamadaCard({ camada }: { camada: any }) {
    const navigate = useNavigate();
    const IconComponent = camada.icon;
    return (
        <div
            key={camada.id}
            className={styles.card}
        >
            {/* Icon */}
            <div className={styles.iconContainer}>
                <IconComponent className={styles.icon} />
            </div>

            {/* Nivel Label */}
            <div className={styles.nivel}>
                Camada {camada.nivel}
            </div>

            {/* Title */}
            <h2 className={styles.cardTitle}>
                {camada.titulo.replace("-", "\n")}
            </h2>

            {/* Description */}
            <p className={styles.description}>
                {camada.descricao}
            </p>

            {/* Button */}
            <button
                onClick={() => navigate(camada.path)}
                className={styles.button}
            >
                Acesse
                <ArrowRight className={styles.buttonIcon} />
            </button>
        </div>
    );
}