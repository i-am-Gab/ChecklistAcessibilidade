import { ShieldCheck } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.creditsContainer}>
            <ShieldCheck fill="#666" color="#fff" size={18}/>
            <span className={styles.creditsText}>
              © 2026 Desenvolvido por Gabriel Aguiar Alves e Silva. Todos os direitos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}