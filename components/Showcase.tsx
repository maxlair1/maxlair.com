'use client';

import * as React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import * as Utilities from '@lib/utilities';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Showcase.module.css';
import Skeleton from '@components/Skeleton';
import CircularProgress from './CircularProgress';
import { ArrowRight, ArrowLeft, Play, Square } from 'lucide-react';

const slides = [
  {
    headline: 'Omni-channel AI interaction enables Property Owners to chat with Tenants across SMS, email, web, and mobile app',
    project: 'Hominy AI',
    image: '/projects/hominy-appearance_proj.png', 
    alt: 'Hominy AI',
  },
  {
    headline: 'Coffee compendium in your pocket: Cafe-driven monetization model with unique features like Smart Parking',
    project: 'Local Bean',
    image: '/projects/lb_show.png', 
    alt: 'Local Bean',
  },
  {
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    project: 'US Army: ATIS Design System',
    image: '/projects/ATIS_proj.png', 
    alt: 'ATIS Design System',
  },
  {
    headline: '500% faster FAA airspace approval for first-responder drone pilots, with enhanced touchless SGI waiver submission',
    project: 'Faaviator',
    image: '/projects/faa_proj.png', 
    alt: 'Faaviator',
  },
  {
    headline: 'Cross-platform, documentation-fueled project mangement tool for teams of any size',
    project: 'Grokadoc',
    image: '/projects/grok_proj.png', 
    alt: 'Grokadoc',
  },
  {
    headline: 'Using reward systems to gamify traditional Pomodoro focus technique',
    project: 'Dedoro',
    image: '/projects/dedoro_proj.png', 
    alt: 'Dedoro',
  },
  {
    headline: 'Gamifying science-backed and heart-centric exercise: Exploring unique controls for kinetic environments (like audio and haptic queues)',
    project: 'HeartHero Fitness',
    image: '/projects/hearthero_proj.png', 
    alt: 'HeartHero Fitness',
  },
];

export default function Showcase() {
  const [isReady, setIsReady] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);   // ← New
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isHoveringDial, setIsHoveringDial] = React.useState(false);
  const [autoplayPercentageLeft, setAutoplayPercentageLeft] = React.useState(100);

  const swiperRef = React.useRef<any>(null);

  // 1. Preload ALL images BEFORE showing anything
  React.useEffect(() => {
    const preloadAll = async () => {
      const promises = slides
        .filter(slide => slide.image)
        .map(slide => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // don't block if one fails
            img.src = slide.image;
          });
        });

      await Promise.all(promises);
      // Small delay so the transition feels smooth
      setTimeout(() => setIsReady(true), 250);
      setTimeout(() => setIsVisible(true), 200);
    };

    preloadAll();
  }, []);

  function handlePlayPause() {
    console.log(swiperRef.current.autoplay.paused)
    if (!swiperRef.current) return;
    
    if (swiperRef.current.autoplay.running) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }

    setIsPaused(!isPaused);
  }

  function handleAdvanceSlide() {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
  }

  function handlePreviousSlide() {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
  }

  if (!isReady) {
    return <Skeleton preset="showcase" />;
  }
  
  return (
    <div className={styles.section}>
      <div className={Utilities.classNames(styles.swiperContainer, isVisible ? styles.visible : '')}>
        <Swiper
          modules={[EffectCards, Pagination, Navigation, Autoplay]}
          effect="cards"
          // disable effects eventaully for preferes reduced motion users
          cardsEffect={{
            perSlideOffset: 7,
            perSlideRotate: 0.35,
            slideShadows: true,
            rotate: true,
          }}
          // onLoad={() => setIsLoading(false)}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={40}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}        
          onAutoplayTimeLeft={(_, timeLeft, percentage) => {
            const debouncedPercentage = Math.round(percentage * 100);
            if (autoplayPercentageLeft !== debouncedPercentage) {
              setAutoplayPercentageLeft(debouncedPercentage - 10);
            }
          }}
          onRealIndexChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          speed={600}
          className={styles.swiper}
              >
          {slides.map((slide, key) => (
            <SwiperSlide  key={key} className={styles.slide}>
              <div className={styles.slideCard}>
                {slide.image && (
                  <Image 
                    src={slide.image} 
                    alt={slide.alt} 
                    className={styles.slideCardImage} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    priority={key === 0}
                    style={{objectFit: 'cover'}} 
                    quality={100}
                    unoptimized
                    // onLoad={() => {
                    //   if (key === 0) {
                    //     setIsLoading(false)
                    //   } 
                    // }}
                  />
                  )}
                <div className={styles.overlay}/>

                {(key === currentSlide) && (
                <div className={styles.slideCardBody}>
                  <span className={styles.label}>
                    <h3 className={styles.project}>{slide.project}</h3>
                    <h2 className={styles.headline}>{slide.headline}</h2>
                  </span>
                  <div className={styles.controls} role='swiper control'>
                    <button onClick={handlePreviousSlide} className={styles.advanceButton}>
                      <ArrowLeft size={24} className={styles.buttonIcon} color='var(--white)'/>
                    </button>
                    <button onClick={handlePlayPause} onMouseEnter={() => setIsHoveringDial(true)} onMouseLeave={() => setIsHoveringDial(false)} className={styles.pauseButton}>
                      <CircularProgress size={48} thickness={3} value={autoplayPercentageLeft}>
                        { isHoveringDial || isPaused ? (!isPaused ? <Square color='var(--white)' /> : <Play color='var(--white)' />)
                        : <small className='footnote'>{key + 1}/{slides.length}</small>}
                      </CircularProgress>
                    </button>
                    <button onClick={handleAdvanceSlide} className={styles.advanceButton}>
                      <ArrowRight size={24} className={styles.buttonIcon} color='var(--white)'/>
                    </button>
                  </div>
                </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper> 
      </div>
    </div>
  );
}