'use client';

import * as React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Showcase.module.css';
import Skeleton from '@components/Skeleton';
import CircularProgress from './CircularProgress';
import { ArrowRight, Play, Square } from 'lucide-react';

const slides = [
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'mobile',
    headline: 'Over 50% raise in layout design speed, with improved developer handoff',
    title: 'US Army: ATIS Design System',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },

];

export default function Showcase() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isHoveringDial, setIsHoveringDial] = React.useState(false);
  const [autoplayPercentageLeft, setAutoplayPercentageLeft] = React.useState(100);
  const swiperRef = React.useRef<any>(null);

  React.useEffect(()=> {
    console.log('Current Slide:', currentSlide);
  },[currentSlide])

  React.useEffect(() => {
    setIsLoading(false);
  },[isLoading])

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

  if (isLoading) return <Skeleton preset="showcase"/>
  
  return (
    <div className={styles.section}>
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
          swiperRef.current = swiper;    // Save instance when Swiper initializes
        }}        
        onAutoplayTimeLeft={(_, timeLeft, percentage) => {
          const debouncedPercentage = Math.round(percentage * 100);
          if (autoplayPercentageLeft !== debouncedPercentage) {
            setAutoplayPercentageLeft(debouncedPercentage - 10);
            // console.log(debouncedPercentage)
          }
        }}
        // onActiveIndexChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        onRealIndexChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        speed={600}
        className={styles.swiper}
            >
        {slides.map((slide, key) => (
          <SwiperSlide  key={key} className={styles.slide}>
            {/* Add's class `.active`  */}
            <div className={styles.slideCard}>
              {/* Code
                1. SlideCard - the card part of each slide
                2. Marquee and Overlay
                  a. Titles
                  b. Progress Button
              */}
              {slide.image && <Image src={slide.image} alt={slide.alt} className={styles.slideCardImage} fill style={{objectFit: 'cover'}} />}
              <div className={styles.overlay}/>
              {(key === currentSlide) && (
              <div className={styles.slideCardBody}>
                <span className={styles.label}>
                  <h3>{slide.title}</h3>
                  <h2>{slide.headline}</h2>
                </span>
                <div className={styles.controls} role='swiper control'>
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
        <div>Test</div>
    </div>
  );
}