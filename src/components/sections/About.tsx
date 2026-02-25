"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SplitText from "../ui/SplitText";
import ProfileCard from "../ui/ProfileCard";
import VariableProximity from "../ui/VariableProximity";
import '../../styles/VariableProximity.css';
import styles from "../../styles/About.module.scss";
import { Code, Database, Brain, Cpu, Globe, Zap } from 'lucide-react';

const About: React.FC = () => {
    // Create a ref for the container that VariableProximity will use
    const containerRef = useRef<HTMLDivElement>(null);
    

    const skills = [
        { name: "Frontend Development", icon: Globe, color: "var(--accent)" },
        { name: "AI & Machine Learning", icon: Brain, color: "var(--accent)" },
        { name: "Data Structures & Algorithms", icon: Database, color: "var(--accent)" },
        { name: "System Design", icon: Cpu, color: "var(--accent)" },
        { name: "Problem Solving", icon: Zap, color: "var(--accent)" },
        { name: "Full Stack Development", icon: Code, color: "var(--accent)" }
    ];

    const technologies = {
        "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C++"],
        "Frontend": ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
        "Backend": ["Node.js", "Express", "FastAPI", "MongoDB", "PostgreSQL"],
        "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"]
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            filter: "blur(10px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                damping: 20,
                stiffness: 100,
                duration: 0.8
            }
        }
    };

    // Profile card configuration
    const profileStats = [
        { number: "3+", label: "Years Coding" },
        { number: "25+", label: "Projects" }
    ];

    const handleContactClick = () => {
        // Add your contact logic here
        console.log("Contact clicked!");
        // You can open a modal, scroll to contact section, etc.
    };

    return (
        <section className={styles.about} id="about">
            <div className={styles.container} ref={containerRef}>
                {/* Section Header */}
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className={styles.sectionNumber}>
                        <span>01.</span>
                    </motion.div>
                    <motion.div variants={itemVariants} className={styles.titleWrapper}>
                        <SplitText
                            text="About Me"
                            className={styles.sectionTitle}
                            splitType="chars"
                            delay={60}
                            duration={0.6}
                            ease="power2.out"
                            from={{ opacity: 0, y: 20, rotationX: -90 }}
                            to={{ opacity: 1, y: 0, rotationX: 0 }}
                            threshold={0.1}
                            rootMargin="-50px"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants} className={styles.divider} aria-hidden="true" />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    className={styles.content}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-150px" }}
                    variants={containerVariants}
                >
                    {/* LEFT SIDE - Profile Card */}
                    <motion.div className={styles.profileSection} variants={itemVariants}>
                        <ProfileCard
                            avatarUrl="/assets/images/portfolio.jpg"
                            miniAvatarUrl="/assets/images/sp.png"
                            name="Samarth Patil"
                            title="Software Engineer & AI Enthusiast"
                            handle="samarthpatil"
                            status="Available for work"
                            contactText="Get in touch"
                            showUserInfo={true}
                            enableTilt={true}
                            enableMobileTilt={true}
                            mobileTiltSensitivity={3}
                            onContactClick={handleContactClick}
                            className={styles.customProfileCard}
                        />

                        {/* Stats Section */}
                        <div className={styles.statsSection}>
                            {profileStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className={styles.stat}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <span className={styles.statNumber}>{stat.number}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - Text Content */}
                    <div className={styles.textContent}>
                        <motion.div variants={itemVariants} className={styles.introduction}>
                            <div className={styles.variableProximityParagraph}>
                                <VariableProximity
                                    label="Hello! I'm Samarth, a B.Tech Computer Science student specializing in AI and Machine Learning. I work with Java, Python, and the MERN stack, building AI models and full-stack applications. As Vice President of ACM Student Chapter, I lead tech-driven projects focused on secure, scalable backend systems and algorithmic problem-solving."
                                    containerRef={containerRef}
                                    fromFontVariationSettings="'wght' 500, 'slnt' 0"
                                    toFontVariationSettings="'wght' 900, 'slnt' -10"
                                    radius={120}
                                    falloff="exponential"
                                    className={styles.variableProximityText}
                                />
                            </div>
                            <div className={styles.variableProximityParagraph}>
                                <VariableProximity
                                    label="My journey spans full-stack development, AI/ML, and competitive programming. With a strong foundation in Data Structures and Algorithms, I particularly enjoy backend development and designing secure, scalable, and reliable systems that solve practical challenges."
                                    containerRef={containerRef}
                                    fromFontVariationSettings="'wght' 500, 'slnt' 0"
                                    toFontVariationSettings="'wght' 900, 'slnt' -10"
                                    radius={120}
                                    falloff="exponential"
                                    className={styles.variableProximityText}
                                />
                            </div>
                            <div className={styles.variableProximityParagraph}>
                                <VariableProximity
                                    label="I'm naturally curious and always eager to learn, especially in AI, machine learning, and secure backend technologies. My goal is to contribute to impactful projects that solve real-world problems through clean, efficient, and effective software solutions."
                                    containerRef={containerRef}
                                    fromFontVariationSettings="'wght' 500, 'slnt' 0"
                                    toFontVariationSettings="'wght' 900, 'slnt' -10"
                                    radius={120}
                                    falloff="exponential"
                                    className={styles.variableProximityText}
                                />
                            </div>
                        </motion.div>

                        {/* Skills Grid */}
                        <motion.div variants={itemVariants} className={styles.skillsGrid}>
                            <h3>What I Do</h3>
                            <div className={styles.skillsContainer}>
                                {skills.map((skill, index) => {
                                    const Icon = skill.icon;
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            className={styles.skillCard}
                                            whileHover={{
                                                y: -5,
                                                transition: { duration: 0.2 }
                                            }}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.5,
                                                ease: "easeOut"
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            <Icon className={styles.skillIcon} size={24} />
                                            <span>{skill.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Technologies Section */}
                        <motion.div variants={itemVariants} className={styles.techSection}>
                            <div className={styles.techContainer}>
                                <h3>Technologies I Work With</h3>
                                <div className={styles.techGrid}>
                                    {Object.entries(technologies).map(([category, techs]) => (
                                        <motion.div
                                            key={category}
                                            className={styles.techCategory}
                                            initial={{ opacity: 0, x: 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                        >
                                            <h4>{category}</h4>
                                            <ul>
                                                {techs.map((tech, index) => (
                                                    <motion.li
                                                        key={tech}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            delay: index * 0.05,
                                                            duration: 0.4
                                                        }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <span className={styles.techBullet}>▹</span>
                                                        {tech}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;