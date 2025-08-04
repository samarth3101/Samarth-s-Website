'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "../../styles/Project.module.scss";

const projects = [
  {
    title: 'PCU ACM Website',
    description: 'A full-stack website project for PCU ACM, featuring a modern UI/UX design, ticketing system, contact form, and feedback section with robust backend implementation.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    code: `const TicketingSystem = () => {
  const handleBooking = async (eventId) => {
    const response = await fetch('/api/tickets', {
      method: 'POST',
      body: JSON.stringify({ eventId, userId })
    });
    return response.json();
  };
};`,
    img: '/assets/images/pcuacm.png',
    repo: 'https://github.com/samarth3101/athertech_acm_off_web',
    link: 'https://pcuacm.netlify.app'
  },
  {
    title: 'Real-Time Stock Data Visualization',
    description: 'A financial data visualization project utilizing Perspective to render real-time stock market trends, inspired by J.P. Morgan & Chase + Forage experience.',
    tech: ['React', 'Perspective', 'WebSocket', 'Financial APIs'],
    code: `const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    const ws = new WebSocket('wss://stock-api');
    ws.onmessage = (e) => setStockData(JSON.parse(e.data));
  }, []);
  return <PerspectiveViewer data={stockData} />;
};`,
    img: '/assets/images/jpmorgen.png',
    repo: 'https://github.com/samarth3101/SkillVenture/tree/main/Project-1',
    link: 'https://github.com/samarth3101/SkillVenture/tree/main/Project-1'
  },
  {
    title: 'GoGarage',
    description: 'A web project focused on REST APIs and backend technologies, designed to enhance practical knowledge in web development with a clean and scalable structure.',
    tech: ['Node.js', 'Express', 'REST API', 'MongoDB'],
    code: `app.post('/api/vehicles', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  await vehicle.save();
  res.status(201).json(vehicle);
});`,
    img: '/assets/images/gogarage.png',
    repo: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/5.GoGarage'
  },
  {
    title: 'ValueVista Project',
    description: 'A full-stack web application integrating SQL for data management, form submissions, and dynamic frontend-backend interactions with comprehensive data visualization.',
    tech: ['React', 'Node.js', 'SQL', 'Express'],
    code: `const DataVisualization = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchSQLData().then(setData);
  }, []);
  return <Chart data={data} />;
};`,
    img: '/assets/images/valuevista.png',
    repo: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/6.%20ValueVista'
  },
  {
    title: 'SkillSwap eLearning Platform',
    description: 'A cutting-edge web platform featuring a human-touch virtual instructor to provide interactive learning experiences with free knowledge modules and visually appealing UI/UX.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    code: `const VirtualInstructor = ({ lesson }) => {
  return (
    <InstructorAvatar 
      lesson={lesson}
      interactive={true}
    />
  );
};`,
    img: '/assets/images/skillswap.png',
    repo: 'https://github.com/samarth3101/SkillVenture/tree/35264c359344cd6a4c6a9c183d77e3a4d4aa771f/Project-2/SKILLSWAP-PRO',
    link: 'https://github.com/samarth3101/SkillVenture/tree/35264c359344cd6a4c6a9c183d77e3a4d4aa771f/Project-2/SKILLSWAP-PRO'
  },
  {
    title: 'Spotify Clone',
    description: 'A web-based Spotify clone featuring an interactive UI, music playbook, and seamless user experience using modern web technologies.',
    tech: ['React', 'JavaScript', 'Spotify API', 'CSS'],
    code: `const audioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  return <AudioControl track={currentTrack} />;
};`,
    img: '/assets/images/spotify.png',
    repo: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/2.Spotify-clone',
    link: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/2.Spotify-clone'
  },
  {
    title: 'CyberTronix - Transformers Project',
    description: 'A dynamic web project showcasing rotating cards, animations, and interactive UI elements using JavaScript and CSS with advanced 3D transformations.',
    tech: ['JavaScript', 'CSS', 'HTML', 'Animations'],
    code: `const transformCard = (element, rotation) => {
  element.style.transform = 
    \`rotateY(\${rotation}deg) rotateX(15deg)\`;
  element.style.transition = 'transform 0.6s ease';
};`,
    img: '/assets/images/cyber.png',
    repo: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/4.%20Transformers',
    link: 'https://github.com/samarth3101/WebVerse/tree/main/My_Projects/4.%20Transformers'
  },
  {
    title: 'Simon Game',
    description: 'A classic Simon Game built purely with JavaScript, utilizing DOM manipulation and core web development concepts to create an interactive and engaging memory game.',
    tech: ['JavaScript', 'HTML', 'CSS', 'DOM'],
    code: `const simonGame = {
  sequence: [],
  playerSequence: [],
  level: 0,
  generateSequence() {
    this.sequence.push(Math.floor(Math.random() * 4));
    this.playSequence();
  }
};`,
    img: '/assets/images/simon.png',
    repo: 'https://github.com/samarthpatil/simon-game',
    link: 'https://simon-game-demo.vercel.app'
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
              whileHover={proj.isCTA ? {} : {
                scale: 1.045,
                boxShadow: "0 14px 56px rgba(95,241,210,0.14)",
                zIndex: 2,
                transition: { duration: 0.17 }
              }}
              whileTap={proj.isCTA ? {} : { scale: 0.96 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              initial={{ y: 32, opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.54,
                ease: [0.23, 1, 0.32, 1],
                delay: idx * 0.06
              }}
              viewport={{ once: true, amount: 0.32 }}
              onClick={() => (!proj.isCTA && setOpenIdx(idx))}
              style={{ cursor: proj.isCTA ? 'pointer' : 'zoom-in' }}
              layoutId={`project-card-${idx}`}
              tabIndex={0}
              aria-label={
                proj.isCTA ? proj.title : `Show more about ${proj.title}`
              }
            >
              {proj.img && (
                <motion.div
                  className={styles.cardImgWrap}
                  layoutId={`project-img-${idx}`}
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
        <AnimatePresence>
          {openIdx !== null && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.13 }}
              onClick={() => setOpenIdx(null)}
            >
              <motion.div
                className={styles.modalCard}
                layoutId={`project-card-${openIdx}`}
                initial={false}
                animate={{
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  boxShadow: '0 35px 130px rgba(95,241,210,0.25)'
                }}
                exit={{ scale: 0.96, y: 65, opacity: 0, transition: { duration: 0.18 } }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 38
                }}
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
                    transition={{ type: 'spring', stiffness: 310, damping: 28 }}
                  >
                    <img src={projects[openIdx].img} alt={`${projects[openIdx].title} preview`} className={styles.modalImg} draggable={false} />
                  </motion.div>
                )}
                <motion.div
                  className={styles.modalContent}
                  initial={{ opacity: 0, y: 38 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.10, duration: 0.31 } }}
                  exit={{ opacity: 0, y: 30 }}
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
