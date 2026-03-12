import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/Button/button";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Logo/Icon */}
        <div className={styles.logoContainer}>
          <span className={styles.logo}>CA</span>
        </div>

        {/* Título */}
        <h1 className={styles.title}>
          Checklist Acessibilidade
        </h1>

        {/* Descrição */}
        <p className={styles.description}>
          Acompanhe o seu progresso para um desenvolvimento
          acessível.
        </p>

        {/* CTA Button */}
        <Button
          text="Acessar Checklists"
          onClick={() => navigate("/camadas")}
          variant="primary"
          customColor="#00b894"
          icon={<ArrowRight />}
          iconPosition="right"
          iconAnimation="slideRight"
        />
      </div>
    </div>
  );
}