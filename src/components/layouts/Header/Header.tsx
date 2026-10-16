import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${styles.navButton} ${isActive ? styles.active : styles.inactive}`;
  };

  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${styles.mobileMenuButton} ${isActive ? styles.active : styles.inactive}`;
  };

  return (
    <header className={styles.header}>
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
            <nav className={styles.desktopNav}>
              <NavLink to="/camadas" className={getLinkClass}>
                Checklists
              </NavLink>
              <NavLink to="/sobre" className={getLinkClass}>
                Sobre
              </NavLink>
              <a
                href="https://docs.google.com/document/d/1VdlJtriZKQ5HoATTMbj4lq2AdkP0FQzLm3HczXgvxvk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                Documentação
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.mobileMenuButton}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className={styles.menuIcon} />
              ) : (
                <Menu className={styles.menuIcon} />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <nav className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
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
              href="https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?usp=sharing"
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
