"use client";
import React, { useState } from "react";
import { Briefcase, Code2, Award, Building, Zap, Target, TrendingUp, Users } from "lucide-react";
import styles from "../../styles/Experience.module.scss";

const experiences = [
  {
    id: "jpmorgan",
    company: "J.P. Morgan",
    role: "Software Engineering Virtual Intern",
    duration: "May - Jul 2024",
    location: "Virtual Experience",
    icon: Building,
    highlights: [
      "Developed skills in financial technology through virtual job simulation, gaining insights into market analysis and risk assessment",
      "Built responsive web applications using React and Node.js, handling real-time financial data streams",
      "Implemented secure authentication systems and data visualization dashboards for trading platform interfaces",
      "Applied software engineering best practices in a high-stakes financial environment with zero-tolerance for errors"
    ]
  },
  {
    id: "altair",
    company: "Altair",
    role: "Data Science Intern - COHORT 10",
    duration: "Jun - Aug 2024",
    location: "Virtual ",
    icon: TrendingUp,
    highlights: [
      "Completed Master & Professional training in Data Science, focusing on advanced analytics, AI-driven modeling, and computational techniques",
      "Built production-ready machine learning pipelines processing 10,000+ data points with 95% accuracy",
      "Collaborated with cross-functional teams to deliver data-driven insights that influenced strategic business decisions",
      "Optimized data preprocessing workflows, reducing computation time by 40% through efficient algorithm implementation"
    ]
  },
  {
    id: "eduskill",
    company: "AWS",
    role: "AWS Virtual Intern - COHORT 9",
    duration: "Mar - May 2024",
    location: "Remote",
    icon: Code2,
    highlights: [
      "Gained hands-on experience in AWS Cloud Foundations and Architecture, learning cloud deployment, security, and infrastructure management",
      "Designed and deployed scalable cloud solutions using EC2, S3, and Lambda, serving 500+ concurrent users",
      "Implemented CI/CD pipelines for automated deployments, reducing deployment time by 60%",
      "Mastered cloud security protocols and cost optimization strategies for enterprise-level applications"
    ]
  },
  {
    id: "leadership",
    company: "University Leadership Programs",
    role: "Cultural Head Coordinator & Team Leader",
    duration: "Aug 2023 - Aug 2024",
    location: "University Campus",
    icon: Users,
    highlights: [
      "Led cultural initiatives and coordinated university-wide events, managing teams of 25+ members to foster creativity and student engagement",
      "Spearheaded IDEATHON 2K24 as Team Leader, facilitating brainstorming sessions and presenting impactful ideas while managing workflow and strategy",
      "Organized and managed multiple large-scale events with 500+ attendees, demonstrating project management and leadership capabilities",
      "Enhanced campus vibrancy through innovative event planning and cross-functional collaboration with administration and student bodies"
    ]
  },
  {
    id: "VicePresident",
    company: "ACM Student Chapter",
    role: "Vice President",
    duration: "Jan 2024 - Present",
    location: "University Campus",
    icon: Users,
    highlights: [
      "Serve as Vice President of ACM Student Chapter, providing strategic leadership and direction to promote computing education and professional development",
      "Organize and coordinate technical workshops, coding competitions, and guest lectures engaging 200+ students and enhancing members' industry readiness",
      "Lead flagship events including IDEATHON 2K24, facilitating innovation showcases and collaborative project development within the tech community",
      "Collaborate with university administration and industry partners to expand chapter reach, securing sponsorships and mentorship opportunities for members"
    ]
  },

  {
    id: "projects",
    company: "Personal & Academic Projects",
    role: "Full Stack Developer & AI Enthusiast",
    duration: "Aug 2023 - Present",
    location: "Self-Directed",
    icon: Zap,
    highlights: [
      "Developed 15+ full-stack applications using React, Node.js, Python, and modern databases, showcasing versatility across technology stacks",
      "Built AI-powered solutions leveraging machine learning algorithms, natural language processing, and computer vision technologies",
      "Mastered Data Structures & Algorithms with 500+ problems solved across LeetCode, HackerRank, and competitive programming platforms",
      "Created portfolio of projects demonstrating expertise in web development, mobile applications, and artificial intelligence implementations"
    ]
  }
];

const BUTTON_HEIGHT = 42;

const Experience: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState("altair");
  const [barPosition, setBarPosition] = useState(0);

  const currentExp = experiences.find(exp => exp.id === activeExperience) || experiences[0];

  const handleCompanyClick = (expId: string, index: number) => {
    setActiveExperience(expId);
    setBarPosition(index * BUTTON_HEIGHT);
  };

  return (
    <section className={styles.experience} id="experience">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>02.</span>
          <span className={styles.sectionTitle}>Where I've Made Impact</span>
          <div className={styles.divider} />
        </div>

        <div className={styles.experienceContent}>
          {/* Companies Sidebar */}
          <nav className={styles.companiesSidebar} aria-label="Company List">
            <div className={styles.barContainer}>
              <div
                className={styles.activeBar}
                style={{ transform: `translateY(${barPosition}px)` }}
                aria-hidden="true"
              />
            </div>
            <div className={styles.companiesList}>
              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                return (
                  <button
                    key={exp.id}
                    className={`${styles.companyButton} ${activeExperience === exp.id ? styles.active : ""}`}
                    onClick={() => handleCompanyClick(exp.id, index)}
                    aria-current={activeExperience === exp.id ? "page" : undefined}
                    type="button"
                  >
                    <IconComponent size={16} className={styles.companyIcon} />
                    <span className={styles.companyName}>{exp.company}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Experience Details */}
          <section className={styles.experienceDetails}>
            <header className={styles.roleHeader}>
              <h3 className={styles.roleTitle}>
                {currentExp.role} <span className={styles.atSymbol}>@</span>
                <span className={styles.companyName}> {currentExp.company}</span>
              </h3>
              <div className={styles.experienceMeta}>
                {currentExp.duration}
                <span className={styles.metaDot}>|</span>
                {currentExp.location}
              </div>
            </header>
            <ul className={styles.highlights}>
              {currentExp.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
            {/* Glassy box: soft reflection effect */}
            <div className={styles.bgGlassBox} aria-hidden="true" />
          </section>
        </div>
      </div>

      <div className={styles.ctaFooter}>
        <div className={styles.subtleMessage}>
          Ready to explore my projects next?
        </div>
      </div>
    </section>
  );
};

export default Experience;
