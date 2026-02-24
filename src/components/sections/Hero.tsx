import React from "react";
import { motion } from 'framer-motion';
import SplitText from "../ui/SplitText";
import TextType from "../ui/TextType";
import styles from "../../styles/Hero.module.scss";

const Hero: React.FC = () => {
  const dynamicStatements = [
    "I innovate with every line of code...",
    "I build AI-powered solutions...",
    "I solve complex problems with ML...",
    "I create intelligent applications...",
    "I develop full-stack solutions...",
    "I master Data Structures & Algorithms...",
    "I optimize algorithms for performance...",
    "I solve complex DSA challenges...",
    "I excel in competitive programming...",
    "I write efficient and clean code...",
    "I ace coding interviews with DSA skills...",
    "I design scalable system architectures...",
    "I implement advanced data structures...",
    "I analyze time & space complexity...",
    "I debug and optimize code efficiently..."
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Greeting with glow effect */}
          <div className={styles.greetingWrapper}>
            <SplitText
              text="Howdy, I'm"
              className={styles.greeting}
              splitType="words"
              delay={60}
              duration={0.8}
              ease="power2.out"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
            />
          </div>

          {/* Name */}
          <div className={styles.nameWrapper}>
            <SplitText
              text="Samarth Patil"
              className={styles.name}
              splitType="chars"
              delay={80}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
            />
          </div>

          {/* Dynamic Statement */}
          <div className={styles.statementWrapper}>
            <TextType
              text={dynamicStatements}
              className={styles.statement}
              typingSpeed={80}
              deletingSpeed={50}
              pauseDuration={3000}
              initialDelay={1500}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.8}
              textColors={["#5ff1d2"]}
              startOnVisible={true}
            />
          </div>

          {/* Description with highlighted text */}
          <motion.div 
            className={styles.descriptionWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              ease: "easeOut" 
            }}
          >
            <p className={styles.description}>
              I'm a <span className={styles.highlight}>B.Tech Computer Science student</span> specializing in <span className={styles.highlight}>AI and Machine Learning</span>. Skilled in <span className={styles.highlight}>Java, Python</span>, and the <span className={styles.highlight}>MERN stack</span>, I build full-stack web applications and AI models that solve real-world problems. As <span className={styles.highlight}>Vice President of ACM Student Chapter</span>, I lead tech-driven projects with a focus on secure, scalable backend systems and algorithmic problem-solving.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className={styles.ctaWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.6,
              ease: "easeOut" 
            }}
          >
            <a href="/assets/Samarth-Resume.pdf" target="_blank" rel="noopener noreferrer">
              <span className={styles.cta}>
                Check Out My Resume
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
