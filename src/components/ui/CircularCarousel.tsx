'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/CircularCarousel.module.scss';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  level: string;
  students: string;
  rating: string;
  technologies: string[];
  enrollUrl?: string;
}

interface CircularCarouselProps {
  items: CarouselItem[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  onItemClick?: (item: CarouselItem) => void;
}

export default function CircularCarousel({
  items,
  autoRotate = true,
  rotationSpeed = 5000,
  onItemClick
}: CircularCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  const itemCount = items.length;
  const angleIncrement = 360 / itemCount;
  const radius = 550; // Distance from center

  const handleImageError = (id: number) => {
    setImageErrors(prev => new Set(prev).add(id));
  };

  const getPlaceholderGradient = (category: string) => {
    const gradients: Record<string, string> = {
      'MACHINE LEARNING': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'WEB DEV': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'CLOUD COMPUTING': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'DATA ENGINEERING': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'A.I.': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'CYBERSECURITY': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'DATABASE': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'DATA SCIENCE': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'ENTERPRISE DEV': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    };
    return gradients[category] || 'linear-gradient(135deg, #5ff1d2 0%, #4facfe 100%)';
  };

  // Auto-rotation
  useEffect(() => {
    if (autoRotate && !isDragging) {
      autoRotateRef.current = setInterval(() => {
        setRotation(prev => prev - angleIncrement);
      }, rotationSpeed);
      
      return () => {
        if (autoRotateRef.current) {
          clearInterval(autoRotateRef.current);
        }
      };
    }
  }, [autoRotate, isDragging, angleIncrement, rotationSpeed]);

  // Mouse/Touch drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentRotation(rotation);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const deltaRotation = (deltaX / window.innerWidth) * 180;
    setRotation(currentRotation + deltaRotation);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const rotateLeft = () => {
    setRotation(prev => prev + angleIncrement);
  };

  const rotateRight = () => {
    setRotation(prev => prev - angleIncrement);
  };

  const handleCardClick = (item: CarouselItem) => {
    if (item.enrollUrl) {
      window.open(item.enrollUrl, '_blank', 'noopener,noreferrer');
    }
    onItemClick?.(item);
  };

  return (
    <div className={styles.circularCarousel}>
      <div 
        className={styles.carouselScene}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div 
          className={styles.carouselRing}
          style={{
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {items.map((item, index) => {
            const angle = angleIncrement * index;
            const hasImageError = imageErrors.has(item.id);
            
            return (
              <div
                key={item.id}
                className={styles.carouselCard}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                }}
                onClick={() => handleCardClick(item)}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardImage}>
                    {hasImageError ? (
                      <div 
                        className={styles.placeholderImg}
                        style={{ background: getPlaceholderGradient(item.category) }}
                      >
                        <div className={styles.placeholderIcon}>🎓</div>
                        <div className={styles.placeholderText}>
                          {item.category.split(' ')[0]}
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={() => handleImageError(item.id)}
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.badges}>
                      <span className={styles.categoryBadge}>{item.category}</span>
                      <span className={`${styles.levelBadge} ${styles[item.level.toLowerCase()]}`}>
                        {item.level}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>
                      {item.description.length > 100 
                        ? `${item.description.substring(0, 97)}...` 
                        : item.description}
                    </p>
                    <div className={styles.cardMeta}>
                      <span className={styles.issuer}>{item.students}</span>
                      <span className={styles.rating}>{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={rotateLeft}
          aria-label="Rotate left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className={styles.controlBtn}
          onClick={rotateRight}
          aria-label="Rotate right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <p>Drag to rotate • Click to view credential</p>
      </div>
    </div>
  );
}
