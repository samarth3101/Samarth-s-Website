import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import styles from "../../styles/Navbar.module.scss";

// Theme Toggle with smooth animation
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") setIsDark(saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.style.transition = 'background 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s';
  };

  return (
    <button onClick={toggleTheme} className={styles.themeBtn} aria-label="Toggle theme">
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 180, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -180, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

// Enhanced Hexagon Logo
const HexLogo = () => {
  const [rotation, setRotation] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleClick = () => {
    setDirection(prev => prev * -1);
    setRotation(prev => prev + (360 * direction));
  };

  return (
    <motion.div
      className={styles.hexLogo}
      animate={{ rotate: rotation }}
      transition={{ type: "spring", stiffness: 180, damping: 25, duration: 1.3 }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      title="Click to spin!"
    >
      <svg width="42" height="42" viewBox="0 0 60 60">
        <polygon
          points="30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.8"
          opacity="0.9"
        />
      </svg>
      <span className={styles.logoText}>S</span>
    </motion.div>
  );
};

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Courses", href: "#courses" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.15,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }));
  }, [controls]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={styles.navbar}>
        <HexLogo />

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={menuOpen ? styles.active : ''}></span>
          <span className={menuOpen ? styles.active : ''}></span>
          <span className={menuOpen ? styles.active : ''}></span>
        </button>

        <ul
          className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
          onClick={closeMenu}
        >
          {navLinks.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -24 }}
              animate={controls}
              custom={i}
            >
              <a href={link.href} onClick={closeMenu}>
                <span className={styles.chevron}>&gt;</span>
                <span>{link.name}</span>
              </a>
            </motion.li>
          ))}

          <motion.li
            initial={{ opacity: 0, y: -24 }}
            animate={controls}
            custom={navLinks.length}
          >
            <a
              href="/assets/Samarth-July.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
              onClick={closeMenu}
            >
              Resume
            </a>

          </motion.li>

          <li className={styles.themeToggleItem}>
            <div onClick={closeMenu}>
              <ThemeToggle />
            </div>
          </li>
        </ul>
      </nav>

      {menuOpen && (
        <motion.div
          className={styles.overlay}
          onClick={closeMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );
};

export default Navbar;
