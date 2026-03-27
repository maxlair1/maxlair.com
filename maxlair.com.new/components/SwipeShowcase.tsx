'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './SwipeShowcase.module.css';

const slides = [
  {
    id: 'mobile',
    label: 'Mobile',
    image: '/images/atis-mobile-mockup.png',   // Replace with your actual image
    alt: 'Mobile view - ATIS Design System',
  },
  {
    id: 'desktop',
    label: 'Desktop',
    image: '/images/atis-desktop-mockup.png',  // Replace with your actual image
    alt: 'Desktop view - ATIS Design System',
  },
];

export default function DesignSystemShowcase() {
  return (
    <div className={styles.section}>

      <Swiper
        modules={[EffectCards, Pagination, Navigation]}
        effect="cards"
        cardsEffect={{
          perSlideOffset: 5,
          perSlideRotate: 1,
          slideShadows: true,
          rotate: true,
        }}
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
            <div className={styles.slideInner}>
              slide.label
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}