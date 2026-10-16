import styles from "./CamadaCard.module.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { camadas } from "../../../../mocks/camadasMock";

export function CamadaCard({ camada }: { camada: (typeof camadas)[number] }) {
    const IconComponent = camada.icon;
    return (
        <div
            key={camada.id}
            className={styles.card}
        >
            {/* Icon */}
            <div className={styles.iconContainer}>
                <IconComponent className={styles.icon} aria-hidden="true" />
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
            <Link
                to={camada.path}
                className={styles.button}
            >
                Acessar Camada {camada.nivel}
                <ArrowRight className={styles.buttonIcon} aria-hidden="true" />
            </Link>
        </div>
    );
}
