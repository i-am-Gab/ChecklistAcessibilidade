import styles from "./Camadas.module.css";
import { useNavigate } from "react-router";
import { camadas } from "../../mocks/camadasMock";
import { CamadaCard } from "./Components/CamadaCard/CamadaCard";

export default function Camadas() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.wrapper}>
          {/* Title Section */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              Camadas
            </h1>
            <p className={styles.subtitle}>
              Selecione o checklist que deseja visualizar.
            </p>
          </div>

          {/* Cards Grid */}
          <div className={styles.grid}>
            {camadas.map((camada) => {
              return <CamadaCard key={camada.id} camada={camada} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}