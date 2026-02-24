'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from "../../styles/Project.module.scss";

const projects = [
  {
    title: 'PCU ACM Website',
    description: 'A full-stack website project for PCU ACM, featuring a modern UI/UX design, ticketing system, contact form, and feedback section with robust backend implementation.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    img: '/assets/images/pcuacm.png',
    repo: 'https://github.com/samarth3101/athertech_acm_off_web',
    link: 'https://pcuacm.netlify.app'
  },
  {
    title: 'Zecure - AI Cybersecurity Platform',
    description: 'A modular AI cybersecurity framework with autonomous agents for threat detection. Features real-time monitoring, 3D threat visualization, and self-learning models for phishing, fraud, and data leak protection.',
    tech: ['Python', 'TypeScript', 'React', 'AI/ML', 'LLMs'],
    img: '/assets/images/zecure.png',
    repo: 'https://github.com/samarth3101/Zecurex-platform',
    link: 'https://github.com/samarth3101/Zecurex-platform'
  },
  {
    title: 'UniPass - Event Attendance System',
    description: 'AI-powered event attendance management with JWT-signed QR tickets, real-time analytics via SSE streaming, and multi-role dashboards. Features secure validation, automated email ticketing, and comprehensive audit trails.',
    tech: ['FastAPI', 'Next.js', 'PostgreSQL', 'TypeScript'],
    img: '/assets/images/unipass.png',
    repo: 'https://github.com/samarth3101/UniPass',
    link: 'https://github.com/samarth3101/UniPass'
  },
  {
    title: 'Real-Time Stock Data Visualization',
    description: 'A financial data visualization project utilizing Perspective to render real-time stock market trends, inspired by J.P. Morgan & Chase + Forage experience.',
    tech: ['React', 'Perspective', 'WebSocket', 'Financial APIs'],
    img: '/assets/images/jpmorgen.png',
    repo: 'https://github.com/samarth3101/SkillVenture/tree/main/Project-1',
    link: 'https://github.com/samarth3101/SkillVenture/tree/main/Project-1'
  },
  {
    title: 'GoGarage',
    description: 'A web project focused on REST APIs and backend technologies, designed to enhance practical knowledge in web development with a clean and scalable structure.',
    tech: ['Node.js', 'Express', 'REST API', 'MongoDB'],
    img: '/assets/images/gogarage.png',
    repo: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/5.GoGarage'
  },
  {
    title: 'ValueVista Project',
    description: 'A full-stack web application integrating SQL for data management, form submissions, and dynamic frontend-backend interactions with comprehensive data visualization.',
    tech: ['React', 'Node.js', 'SQL', 'Express'],
    img: '/assets/images/valuevista.png',
    repo: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/6.%20ValueVista'
  },
  {
    title: 'SkillSwap eLearning Platform',
    description: 'A cutting-edge web platform featuring a human-touch virtual instructor to provide interactive learning experiences with free knowledge modules and visually appealing UI/UX.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    img: '/assets/images/skillswap.png',
    repo: 'https://github.com/samarth3101/SkillVenture/tree/35264c359344cd6a4c6a9c183d77e3a4d4aa771f/Project-2/SKILLSWAP-PRO',
    link: 'https://github.com/samarth3101/SkillVenture/tree/35264c359344cd6a4c6a9c183d77e3a4d4aa771f/Project-2/SKILLSWAP-PRO'
  },
  {
    title: 'Spotify Clone',
    description: 'A web-based Spotify clone featuring an interactive UI, music playbook, and seamless user experience using modern web technologies.',
    tech: ['React', 'JavaScript', 'Spotify API', 'CSS'],
    img: '/assets/images/spotify.png',
    repo: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/2.Spotify-clone',
    link: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/2.Spotify-clone'
  },
  {
    title: 'Explore All Projects',
    description: 'Browse every project and case study in my complete development portfolio.',
    tech: [],
    isCTA: true,
    link: 'https://github.com/samarth3101'
  }

];



export default function ProjectsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Production-grade spring configurations
  const springConfig = useMemo(() => ({
    desktop: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 32,
      mass: 1.1,
      restSpeed: 0.01,
      restDelta: 0.01
    },
    mobile: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      mass: 0.9,
      restSpeed: 0.01,
      restDelta: 0.01
    }
  }), []);

  const overlayTransition = useMemo(() => ({
    duration: isMobile ? 0.18 : 0.22,
    ease: [0.4, 0, 0.2, 1]
  }), [isMobile]);

  const contentTransition = useMemo(() => ({
    delay: isMobile ? 0.08 : 0.12,
    duration: isMobile ? 0.18 : 0.25,
    ease: [0.25, 0.1, 0.25, 1]
  }), [isMobile]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (openIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openIdx]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openIdx !== null) {
        setOpenIdx(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [openIdx]);

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>03.</span>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.divider} />
        </div>

        <div className={styles.grid}>
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              className={proj.isCTA ? styles.ctaCard : styles.card}
              layoutId={proj.isCTA ? undefined : `project-${idx}`}
              whileHover={proj.isCTA ? {} : {
                scale: 1.035,
                y: -4,
                transition: { 
                  type: 'spring',
                  stiffness: 400,
                  damping: 25
                }
              }}
              whileTap={proj.isCTA ? {} : { 
                scale: 0.98,
                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] } 
              }}
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 25,
                mass: 0.8,
                delay: idx * 0.04
              }}
              viewport={{ once: true, amount: 0.25, margin: "-50px" }}
              onClick={() => (!proj.isCTA && setOpenIdx(idx))}
              style={{ cursor: proj.isCTA ? 'pointer' : 'zoom-in' }}
              tabIndex={0}
              aria-label={
                proj.isCTA ? proj.title : `Show more about ${proj.title}`
              }
            >
              {proj.img && (
                <motion.div 
                  className={styles.cardImgWrap}
                  layoutId={proj.isCTA ? undefined : `project-img-${idx}`}
                >
                  <img src={proj.img} alt={`Preview of ${proj.title}`} className={styles.cardImg} draggable={false} />
                </motion.div>
              )}
              <div className={styles.cardContent}>
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                {!!proj.tech?.length && (
                  <ul className={styles.techList}>
                    {proj.tech.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                )}
                {proj.isCTA && proj.link && (
                  <a
                    href={proj.link}
                    className={styles.ctaButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View All Projects ↗
                  </a>
                )}

              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Animated Modal Overlay --- */}
        <AnimatePresence mode="wait">
          {openIdx !== null && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={overlayTransition}
              onClick={() => setOpenIdx(null)}
            >
              <motion.div
                className={styles.modalCard}
                layoutId={`project-${openIdx}`}
                drag={isMobile ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.3 }}
                dragMomentum={false}
                onDragEnd={(e, info) => {
                  if (isMobile && info.offset.y > 120 && info.velocity.y > 100) {
                    setOpenIdx(null);
                  }
                }}
                transition={isMobile ? springConfig.mobile : springConfig.desktop}
                onClick={e => e.stopPropagation()}
              >
                <button className={styles.closeBtn}
                  aria-label="Close"
                  onClick={() => setOpenIdx(null)}>
                  ×
                </button>
                {projects[openIdx].img && (
                  <motion.div 
                    className={styles.modalHero}
                    layoutId={`project-img-${openIdx}`}
                  >
                    <img src={projects[openIdx].img} alt={`${projects[openIdx].title} preview`} className={styles.modalImg} draggable={false} />
                  </motion.div>
                )}
                <motion.div
                  className={styles.modalContent}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={contentTransition}
                >
                  <h3>{projects[openIdx].title}</h3>
                  <div className={styles.modalDesc}>{projects[openIdx].description}</div>
                  {!!projects[openIdx].tech?.length && (
                    <ul className={styles.techList}>
                      {projects[openIdx].tech.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  )}
                  {projects[openIdx].code && (
                    <pre className={styles.codeBlock}>
                      <code>{projects[openIdx].code}</code>
                    </pre>
                  )}
                  {(projects[openIdx].repo || projects[openIdx].link) && (
                    <div className={styles.links}>
                      {projects[openIdx].repo &&
                        <a href={projects[openIdx].repo} target="_blank" rel="noreferrer">GitHub</a>
                      }
                      {projects[openIdx].link &&
                        <a href={projects[openIdx].link} target="_blank" rel="noreferrer">Live Demo</a>
                      }
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
