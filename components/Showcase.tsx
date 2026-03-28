'use client';

import * as React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Showcase.module.css';
import Skeleton from '@components/Skeleton';

const slides = [
  {
    id: 'mobile',
    label: 'Mobile',
    image: 'https://images.unsplash.com/photo-1745613998978-fae3bf6308fa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'desktop',
    label: 'Desktop',
    image: '/images/atis-desktop-mockup.png',  // Replace with your actual image
    alt: 'Desktop view - ATIS Design System',
  },
  {
    id: '123',
    label: 'Desktop',
    image: '/images/atis-desktop-mockup.png',  // Replace with your actual image
    alt: 'Desktop view - ATIS Design System',
  },
  {
    id: '1245',
    label: 'Desktop',
    image: '/images/atis-desktop-mockup.png',  // Replace with your actual image
    alt: 'Desktop view - ATIS Design System',
  },
  {
    id: '634',
    label: 'Desktop',
    image: '/images/atis-desktop-mockup.png',  // Replace with your actual image
    alt: 'Desktop view - ATIS Design System',
  },
  {
    id: '12',
    label: 'Desktop',
    image: '/images/atis-desktop-mockup.png',  // Replace with your actual image
    alt: 'Desktop view - ATIS Design System',
  },
  {
    id: '87',
    label: 'Desktop',
    image: '/images/atis-desktop-mockup.png',  // Replace with your actual image
    alt: 'Desktop view - ATIS Design System',
  },
];

export function SlideCard(headline: string, alt: string, image?: string) {
  return (
    <div className={styles.slideCard}>
      {image && <Image src={image} alt={alt} className={styles.slideCardImage} fill style={{objectFit: 'fill'}} />}
      <div className={styles.slideCardLabel}>{headline}</div>
    </div>
  );
}

export default function Showcase(loading: () => void) {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(false);
  },[isLoading])

  if (isLoading) return <Skeleton preset="showcase"/>
  
  
  return (
    <div className={styles.section}>

      <Swiper
        modules={[EffectCards, Pagination, Navigation]}
        effect="cards"
        cardsEffect={{
          perSlideOffset: 5,
          perSlideRotate: 0.25,
          slideShadows: true,
          rotate: true,
        }}
        onLoad={() => setIsLoading(false)}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={40}
        speed={600}
        loop={true}
        className={styles.swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div className={styles.slideCard}>
            {/* Code
              1. SlideCard - the card part of each slide
              2. Marquee and Overlay
                a. Titles
                b. Progress Button
            */}
              Test
            <div className="overlay">
              atest
            </div>
            </div>
          </SwiperSlide>
          
        ))}
      </Swiper>
        <div>Test</div>
    </div>
  );
}