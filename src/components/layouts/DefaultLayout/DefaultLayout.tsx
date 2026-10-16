import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./DefaultLayout.module.css";

export function DefaultLayout() {
  return (
    <div className={styles.layoutContainer}>
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
      <Header />

      <main id="conteudo-principal" tabIndex={-1} className={styles.mainContent}>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}
