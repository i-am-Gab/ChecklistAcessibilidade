import { Link } from "react-router";
import styles from "../PersonalizarCamada/FluxoCamadaUm.module.css";

export default function NaoEncontrada({ message = "O endereço informado não corresponde a uma página do site." }: { message?: string }) {
  return <div className={styles.page}><div className={styles.container}>
    <h1>Página não encontrada</h1>
    <p>{message}</p>
    <Link to="/camadas" className={styles.primaryButton}>Escolher uma camada</Link>
  </div></div>;
}
