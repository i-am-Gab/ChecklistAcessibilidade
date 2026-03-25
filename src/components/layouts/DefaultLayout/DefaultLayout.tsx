import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./DefaultLayout.module.css";

export function DefaultLayout() {
  return (
    <div className={styles.layoutContainer}>
      
      <Header />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}