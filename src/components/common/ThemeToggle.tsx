import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import HexLogo from "../common/HexLogo";
import ThemeToggle from "../common/ThemeToggle";
import styles from "../../styles/Navbar.module.scss";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Courses", href: "#courses" },
  { name: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                      localStorage.getItem('theme') === 'dark' ||
                      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12 + 0.19,
        type: "spring",
        stiffness: 120,
        damping: 21,
      },
    }));
  }, [controls]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <HexLogo />
      </div>

      <button
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <ul
        id="main-navigation"
        className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        {navLinks.map((link, i) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, y: -24 }}
            animate={controls}
            custom={i}
          >
            <a href={link.href}>
              <span className={styles.chevron}>{'>'}</span>
              <span className={styles.navText}>{link.name}</span>
            </a>
          </motion.li>
        ))}
        
        <motion.li
          initial={{ opacity: 0, y: -24 }}
          animate={controls}
          custom={navLinks.length}
          className={styles.actionContainer}
        >
          <a
            className={styles.resumeBtn}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={0}
          >
            Resume
          </a>
          
          <ThemeToggle />
        </motion.li>
      </ul>
      
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          tabIndex={-1}
        />
      )}
    </nav>
  );
};

export default Navbar;