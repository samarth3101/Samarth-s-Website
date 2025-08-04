import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/HexLogo.module.scss";

const HexLogo: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  // Alternate direction for playful effect
  const handleClick = () => {
    setDir(prev => (prev === 1 ? -1 : 1));
    setAngle(angle => angle + 360 * dir);
  };

  return (
    <motion.div
      className={styles.hexWrap}
      animate={{ rotate: angle }}
      transition={{ type: "spring", stiffness: 150, damping: 30, duration: 1.25 }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      title="Click to spin!"
      tabIndex={0}
      role="button"
      aria-label="Playful logo, click to rotate"
      onKeyPress={e => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
    >
      <svg viewBox="0 0 60 60" className={styles.hex}>
        <polygon
          points="30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5"
          className={styles.hexBorder}
        />
      </svg>
      <span className={styles.letter}>S</span>
    </motion.div>
  );
};

export default HexLogo;
