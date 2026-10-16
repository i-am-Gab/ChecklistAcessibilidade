import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const documentationUrl = "https://docs.google.com/document/d/1VdlJtriZKQ5HoATTMbj4lq2AdkP0FQzLm3HczXgvxvk/edit?usp=sharing";

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${styles.navButton} ${isActive ? styles.active : styles.inactive}`;
  };

  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${styles.mobileNavLink} ${isActive ? styles.active : styles.inactive}`;
  };

  return (
    <header className={styles.header} onKeyDown={(event) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <div className={styles.headerContent}>
        <div className={styles.wrapper}>
          <div className={styles.headerInner}>
            {/* Logo */}
            <NavLink to="/" className={styles.logoButton}>
              <div className={styles.logoBadge}>
                <span className={styles.logoText}>CA</span>
              </div>
              <span className={styles.logoLabel}>
                Checklists Acessibilidade
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav} aria-label="Navegação principal">
              <NavLink to="/camadas" className={getLinkClass}>
                Checklists
              </NavLink>
              <NavLink to="/sobre" className={getLinkClass}>
                Sobre
              </NavLink>
              <a
                href={documentationUrl}
                aria-label="Documentação (abre em nova aba)"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                Documentação
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              ref={menuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.mobileMenuButton}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="menu-mobile"
            >
              {isMenuOpen ? (
                <X className={styles.menuIcon} aria-hidden="true" />
              ) : (
                <Menu className={styles.menuIcon} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <nav id="menu-mobile" aria-label="Navegação mobile" hidden={!isMenuOpen} className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
            <NavLink
              to="/camadas"
              className={getMobileLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Checklists
            </NavLink>
            <NavLink
              to="/sobre"
              className={getMobileLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </NavLink>
            <a
              href={documentationUrl}
              aria-label="Documentação (abre em nova aba)"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileMenuLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Documentação
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
