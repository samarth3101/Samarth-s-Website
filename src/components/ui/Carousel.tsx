'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import styles from '../../styles/Carousel.module.scss';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  tech: string[];
  img?: string;
  repo?: string;
  link?: string;
  isCTA?: boolean;
}

interface CarouselProps {
  items: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  onItemClick?: (index: number) => void;
}

export default function Carousel({
  items,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = true,
  onItemClick
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrev();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  };

  useEffect(() => {
    if (autoplay && !isPaused) {
      autoplayRef.current = setInterval(goToNext, autoplayDelay);
      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }
  }, [autoplay, isPaused, currentIndex, autoplayDelay]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div 
      className={styles.carouselContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ maxWidth: `${baseWidth}px` }}
    >
      <div className={styles.carouselWrapper}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            className={styles.carouselItem}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
            onClick={() => {
              if (onItemClick && !items[currentIndex].isCTA) {
                onItemClick(currentIndex);
              }
            }}
            style={{ cursor: items[currentIndex].isCTA ? 'pointer' : 'zoom-in' }}
          >
            <div className={`${styles.card} ${items[currentIndex].isCTA ? styles.ctaCard : ''}`}>
              {items[currentIndex].img && (
                <div className={styles.cardImage}>
                  <img 
                    src={items[currentIndex].img} 
                    alt={items[currentIndex].title}
                    draggable={false}
                  />
                </div>
              )}
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  {items[currentIndex].isCTA ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <h3 className={styles.cardTitle}>{items[currentIndex].title}</h3>
                <p className={styles.cardDescription}>{items[currentIndex].description}</p>
                {items[currentIndex].tech && items[currentIndex].tech.length > 0 && (
                  <div className={styles.techStack}>
                    {items[currentIndex].tech.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                )}
                {items[currentIndex].isCTA && items[currentIndex].link && (
                  <a
                    href={items[currentIndex].link}
                    className={styles.ctaButton}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View All Projects ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className={styles.dotsContainer}>
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
            onClick={() => goToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navButton} ${styles.prev}`}
        onClick={goToPrev}
        disabled={!loop && currentIndex === 0}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={`${styles.navButton} ${styles.next}`}
        onClick={goToNext}
        disabled={!loop && currentIndex === items.length - 1}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
