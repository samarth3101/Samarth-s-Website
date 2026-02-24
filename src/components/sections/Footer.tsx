import React from 'react';
import styles from '../../styles/Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <span className={styles.left}>
        &copy; 2026 Samarth Patil
      </span>
      
      <div className={styles.center}>
        <svg className={styles.shieldIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21.5C12 21.5 20 17 20 9.974c0-1.367-.324-2.021-.936-2.542-.523-.447-1.195-.718-1.792-.883-1.564-.43-5.272-1.473-5.272-1.473s-3.708 1.043-5.272 1.473c-.597.165-1.269.436-1.792.883C4.324 7.953 4 8.607 4 9.974 4 17 12 21.5 12 21.5Z" stroke="currentColor" strokeLinejoin="round" fill="none"/>
          <path d="M9.9 12.65l1.437 1.75a.664.664 0 0 0 1.029.001l1.734-2.105" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className={styles.protectedText}>
          Protected by <span className={styles.zecure}>Zecure Systems</span>
        </span>
      </div>
      
      <span className={styles.right}>
        Built for speed &amp; reliability.
      </span>
    </div>
  </footer>
);

export default Footer;
