"use client";
import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from "../../styles/Courses.module.scss";
import Carousel from "../ui/Carousel";
// import ScrollStack, { ScrollStackItem } from "../ui/ScrollStack";

interface Course {
    id: number;
    title: string;
    image: string;
    description: string;
    duration: string;
    level: string;
    students: string;
    rating: string;
    category: string;
    technologies: string[];
    enrollUrl?: string;
}

const courses: Course[] = [
    {
        id: 1,
        title: "AWS Machine Learning",
        image: "/assets/images/Courses/aws.png",
        description: "Comprehensive foundation in machine learning concepts, algorithms, and AWS ML services including SageMaker, data preprocessing, and model deployment.",
        duration: "Graduate Level",
        level: "Advanced",
        students: "AWS Academy",
        rating: "AWS Certified",
        category: "MACHINE LEARNING",
        technologies: ["AWS", "Machine Learning", "SageMaker", "Python"],
        enrollUrl: "https://www.credly.com/badges/b1b6e712-415d-470c-878c-a10879a8ffc7/linked_in_profile"
    },
    {
        id: 2,
        title: "Full Stack Development",
        image: "/assets/images/Courses/apnacollege.png",
        description: "Complete full-stack development program covering modern web technologies, frontend frameworks, backend development, and database integration.",
        duration: "Professional Course",
        level: "Intermediate",
        students: "Apna College",
        rating: "4.7",
        category: "WEB DEV",
        technologies: ["React", "Node.js", "MongoDB", "JavaScript"],
        enrollUrl: "https://mycourse.app/mimBdhuJ6stnHiSh0"
    },
    {
        id: 3,
        title: "Red Hat App Development",
        image: "/assets/images/Courses/redhat.png",
        description: "Advanced Java EE development with enterprise-grade application programming, covering servlets, JSP, EJB, and modern enterprise development practices.",
        duration: "Professional Level",
        level: "Advanced",
        students: "Red Hat",
        rating: "Red Hat Certified",
        category: "ENTERPRISE DEV",
        technologies: ["Java EE", "Servlets", "JSP", "EJB"],
        enrollUrl: "https://www.credly.com/badges/2b499362-37af-4538-8bcb-161c5e945a59/linked_in_profile"
    },
    {
        id: 4,
        title: "Machine Learning Master",
        image: "/assets/images/Courses/altair.png",
        description: "Advanced machine learning mastery program covering deep learning, neural networks, model optimization, and real-world ML applications using RapidMiner.",
        duration: "Master Level",
        level: "Expert",
        students: "RapidMiner",
        rating: "Altair Certified",
        category: "MACHINE LEARNING",
        technologies: ["Machine Learning", "RapidMiner", "Deep Learning", "Neural Networks"],
        enrollUrl: "https://openbadgefactory.com/v1/assertion/82bbbb86b6b7e6a2c6f137d36f79a22cea247f5f.html"
    },
    {
        id: 5,
        title: "Data Engineering Master",
        image: "/assets/images/Courses/altair.png",
        description: "Comprehensive data engineering program covering data pipelines, ETL processes, big data technologies, and data warehouse design with Altair tools.",
        duration: "Master Level",
        level: "Expert",
        students: "Altair RapidMiner",
        rating: "Altair Certified",
        category: "DATA ENGINEERING",
        technologies: ["Data Engineering", "ETL", "Big Data", "Data Pipelines"],
        enrollUrl: "https://openbadgefactory.com/v1/assertion/7be3f8599474d40220538e4913b70d0e43b46e5b.html"
    },
    {
        id: 6,
        title: "AWS Cloud Architect",
        image: "/assets/images/Courses/aws.png",
        description: "Master cloud architecture principles, AWS services, scalability, security, and cost optimization for building robust cloud infrastructure solutions.",
        duration: "Graduate Level",
        level: "Advanced",
        students: "AWS Academy",
        rating: "AWS Certified",
        category: "CLOUD COMPUTING",
        technologies: ["AWS", "Cloud Architecture", "EC2", "S3"],
        enrollUrl: "https://www.credly.com/badges/78bbc6a9-a4c5-4923-89ce-76f25ba3d868/print"
    },
    {
        id: 7,
        title: "Oracle Cloud Infra",
        image: "/assets/images/Courses/oracle.png",
        description: "Oracle Cloud certification covering OCI services, compute, networking, storage, and database management with focus on AI/ML foundations.",
        duration: "Professional Certification",
        level: "Intermediate",
        students: "Oracle",
        rating: "Oracle Certified",
        category: "CLOUD COMPUTING",
        technologies: ["Oracle Cloud", "OCI", "Database", "Compute"],
        enrollUrl: "https://catalog.education.oracle.com/pls/certview/sharebadge?id=your-credential-id"
    },
    {
        id: 8,
        title: "Introduction to A.I. ",
        image: "/assets/images/Courses/ibm.png",
        description: "Comprehensive introduction to AI concepts, machine learning algorithms, neural networks, and practical AI applications in business and technology.",
        duration: "IBM Course",
        level: "Beginner",
        students: "IBM",
        rating: "IBM Verified",
        category: "A.I.",
        technologies: ["Artificial Intelligence", "Machine Learning", "Python"],
        enrollUrl: "https://www.coursera.org/account/accomplishments/records/LBQFX1RXEAEZ"
    },
    {
        id: 9,
        title: "Cybersecurity for Everyone",
        image: "/assets/images/Courses/uni.png",
        description: "Fundamental cybersecurity principles, threat analysis, risk management, and security best practices for individuals and organizations.",
        duration: "University Course",
        level: "Beginner",
        students: "University of Maryland",
        rating: "University Verified",
        category: "CYBERSECURITY",
        technologies: ["Cybersecurity", "Risk Management", "Security Analysis"],
        enrollUrl: "https://www.coursera.org/account/accomplishments/verify/U4H9ZT27XYFI"
    },
    {
        id: 10,
        title: "Full-stack Development with Django",
        image: "/assets/images/Courses/ibm.png",
        description: "Advanced Django development covering migrations, database management, REST APIs, and full-stack web application development with Python.",
        duration: "Coursera Course",
        level: "Intermediate",
        students: "Coursera",
        rating: "Coursera Verified",
        category: "WEB DEV",
        technologies: ["Django", "Python", "Database Migrations", "REST APIs"],
        enrollUrl: "https://www.coursera.org/account/accomplishments/records/T2FDP8WEOEOQ"
    },
    {
        id: 11,
        title: "Understanding Basic SQL",
        image: "/assets/images/Courses/ibm.png",
        description: "Foundation course in SQL database operations, queries, joins, data manipulation, and database design principles for data management.",
        duration: "Coursera Course",
        level: "Beginner",
        students: "Coursera",
        rating: "Coursera Verified",
        category: "DATABASE",
        technologies: ["SQL", "Database Design", "Data Queries"],
        enrollUrl: "https://www.coursera.org/account/accomplishments/verify/ZF9NEC4OKHI0"
    },
    {
        id: 12,
        title: "Data Science Master",
        image: "/assets/images/Courses/edusk.png",
        description: "Comprehensive data science internship program covering statistical analysis, machine learning, data visualization, and real-world project implementation.",
        duration: "Virtual Internship",
        level: "Advanced",
        students: "AICTE",
        rating: "AICTE Certified",
        category: "DATA SCIENCE",
        technologies: ["Data Science", "Statistical Analysis", "Machine Learning"],
        enrollUrl: "https://certportal.eduskillsfoundation.org/Certificate/pdfcrtallllllllllllll.jsp"
    }
];

const Courses: React.FC = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const [isMobile, setIsMobile] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Mobile detection with effect
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseEnter = useCallback((id: number) => {
        if (!isMobile) {
            setHoveredCard(id);
        }
    }, [isMobile]);

    const handleMouseLeave = useCallback(() => {
        if (!isMobile) {
            setHoveredCard(null);
        }
    }, [isMobile]);

    const handleImageError = useCallback((courseId: number) => {
        setImageErrors(prev => new Set(prev).add(courseId));
    }, []);

    // Enhanced intersection observer for mobile flip behavior
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!isMobile) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const newVisibleCards = new Set(visibleCards);

                entries.forEach((entry) => {
                    const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');

                    if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                        newVisibleCards.add(cardId);
                    } else if (entry.intersectionRatio < 0.3) {
                        newVisibleCards.delete(cardId);
                    }
                });

                setVisibleCards(newVisibleCards);
            },
            {
                threshold: [0, 0.3, 0.7, 1.0],
                rootMargin: '-10% 0px -10% 0px'
            }
        );

        const cardElements = document.querySelectorAll('[data-card-id]');
        cardElements.forEach((card) => {
            if (observerRef.current) {
                observerRef.current.observe(card);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [visibleCards, isMobile]);

    const isCardFlipped = useCallback((cardId: number) => {
        return isMobile ? visibleCards.has(cardId) : hoveredCard === cardId;
    }, [hoveredCard, visibleCards, isMobile]);

    const handleCredentialClick = useCallback((url: string, e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    const getPlaceholderGradient = useCallback((category: string) => {
        const gradients: Record<string, string> = {
            'MACHINE LEARNING': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'WEB DEVELOPMENT': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'CLOUD COMPUTING': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'DATA ENGINEERING': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'ARTIFICIAL INTELLIGENCE': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'CYBERSECURITY': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'DATABASE': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            'DATA SCIENCE': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'ENTERPRISE DEVELOPMENT': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        };
        return gradients[category] || 'linear-gradient(135deg, #5ff1d2 0%, #4facfe 100%)';
    }, []);

    return (
        <section className={styles.coursesSection} id="courses">
            <div className={styles.container}>
                <header className={styles.header}>
                    <span className={styles.sectionNumber}>04.</span>
                    <h2 className={styles.sectionTitle}>Certifications & Courses</h2>
                    <div className={styles.divider} aria-hidden="true" />
                </header>

                {/* Mobile Carousel View */}
                {isMobile ? (
                    <Carousel
                        items={courses.map((course) => ({
                            id: course.id,
                            title: course.title,
                            description: course.description,
                            tech: course.technologies,
                            img: course.image,
                            link: course.enrollUrl
                        }))}
                        baseWidth={340}
                        autoplay={true}
                        autoplayDelay={4000}
                        pauseOnHover={true}
                        loop={true}
                    />
                ) : (
                    /* Desktop Grid View */
                    <div className={styles.grid}>
                        {courses.map((course) => {
                            const isFlipped = isCardFlipped(course.id);
                            const hasImageError = imageErrors.has(course.id);

                            return (
                                <article
                                    key={course.id}
                                    data-card-id={course.id}
                                    className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
                                    onMouseEnter={() => handleMouseEnter(course.id)}
                                    onMouseLeave={handleMouseLeave}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`${course.title} certification details`}
                                >
                                    <div className={styles.cardInner}>
                                        {/* Front Side */}
                                        <div className={styles.cardFront}>
                                            <div className={styles.cardImgWrap}>
                                                {hasImageError ? (
                                                    <div 
                                                        className={styles.placeholderImg}
                                                        style={{ background: getPlaceholderGradient(course.category) }}
                                                    >
                                                        <div className={styles.placeholderIcon}>🎓</div>
                                                        <div className={styles.placeholderText}>
                                                            {course.category.split(' ')[0]}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={course.image}
                                                        alt={`${course.title} certification`}
                                                        className={styles.cardImg}
                                                        loading="lazy"
                                                        onError={() => handleImageError(course.id)}
                                                    />
                                                )}
                                                
                                                <div className={styles.badgeContainer}>
                                                    <span className={styles.categoryBadge}>
                                                        {course.category}
                                                    </span>
                                                    <span className={`${styles.levelBadge} ${styles[course.level.toLowerCase()]}`}>
                                                        {course.level}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={styles.cardContent}>
                                                <h3 className={styles.cardTitle}>{course.title}</h3>
                                                <p className={styles.coursePreview} title={course.description}>
                                                    {course.description.length > 90
                                                        ? `${course.description.substring(0, 87)}...`
                                                        : course.description
                                                    }
                                                </p>
                                                
                                                <ul className={styles.techList}>
                                                    {course.technologies.slice(0, 3).map((tech, index) => (
                                                        <li key={`${course.id}-${tech}-${index}`}>{tech}</li>
                                                    ))}
                                                    {course.technologies.length > 3 && (
                                                        <li className={styles.techMore}>
                                                            +{course.technologies.length - 3}
                                                        </li>
                                                    )}
                                                </ul>
                                                
                                                <div className={styles.courseMeta}>
                                                    <span className={styles.issuer} title={course.students}>
                                                        {course.students}
                                                    </span>
                                                    <span className={styles.rating}>
                                                        {course.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Back Side */}
                                        <div className={styles.cardBack}>
                                            <div className={styles.backContent}>
                                                <div className={styles.backHeader}>
                                                    <h3 className={styles.backTitle}>{course.title}</h3>
                                                    <span className={styles.backCategory}>{course.category}</span>
                                                </div>

                                                <p className={styles.backDescription} title={course.description}>
                                                    {course.description}
                                                </p>

                                                <div className={styles.statsContainer}>
                                                    <div className={styles.statItem}>
                                                        <span className={styles.statLabel}>Duration</span>
                                                        <span className={styles.statValue}>{course.duration}</span>
                                                    </div>
                                                    <div className={styles.statItem}>
                                                        <span className={styles.statLabel}>Level</span>
                                                        <span className={styles.statValue}>{course.level}</span>
                                                    </div>
                                                    <div className={styles.statItem}>
                                                        <span className={styles.statLabel}>Issuer</span>
                                                        <span className={styles.statValue} title={course.students}>
                                                            {course.students}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className={styles.techContainer}>
                                                    <ul className={styles.backTechList}>
                                                        {course.technologies.slice(0, 4).map((tech, index) => (
                                                            <li key={`${course.id}-back-${tech}-${index}`}>{tech}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className={styles.actionContainer}>
                                                    {course.enrollUrl && (
                                                        <button
                                                            type="button"
                                                            className={styles.credentialButton}
                                                            onClick={(e) => handleCredentialClick(course.enrollUrl!, e)}
                                                            aria-label={`View ${course.title} credential`}
                                                        >
                                                            View Credential
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Courses;
