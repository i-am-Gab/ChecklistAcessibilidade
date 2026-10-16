import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import buttonStyles from "../../components/ui/Button/button.module.css";
import styles from "./Home.module.css";

export default function Home() {

  return (
    <main id="conteudo-principal" tabIndex={-1} className={styles.container}>
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
        <Link to="/camadas" className={`${buttonStyles.button} ${buttonStyles.primary}`}>
          Acessar Checklists <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
