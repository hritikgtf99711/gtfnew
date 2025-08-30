
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './carousel.css';

const slides = [
  { video: './assets/video/video_1.mp4', title: 'Creative alchemy', nextTitle: 'All linked by trinity' },
  { video: './assets/video/video_2.mp4', title: 'Innovative design', nextTitle: 'Creative alchemy' },
  { video: './assets/video/video_3.mp4', title: 'Dynamic motion', nextTitle: 'Innovative design' },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const cubicBezier = [0.25, 0.1, 0.25, 1]; // Custom cubic Bezier for smooth easing

  const slideVariants = {
    enter: { x: '100%', opacity: 0.5 },
    center: { x: '0%', opacity: 1 },
    exit: { x: '-100%', opacity: 0.5 },
  };

  const maskVariants = {
    enter: { scale: 1.1, skewX: '15deg', x: '100%' },
    center: { scale: 1, skewX: '0deg', x: '0%' },
    exit: { scale: 1.1, skewX: '-15deg', x: '-100%' },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: cubicBezier } },
  };

  const charVariants = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.3, ease: cubicBezier } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#000]">
      <div className="HeroCarousel_fgCarousel__F645l">
        <div className="HeroCarousel_videos__jjh4t w-full h-full">
          <AnimatePresence initial={false}>
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className={`HeroCarousel_videoMask__9E8ZB ${
                  index === currentIndex ? 'HeroCarousel_active__Xmb4Z' : ''
                } absolute w-full h-full`}
                initial="enter"
                animate={index === currentIndex ? 'center' : 'exit'}
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.8, ease: cubicBezier }}
                style={{ willChange: 'transform, opacity' }}
              >
                <motion.div
                  className="HeroCarousel_videoMask__9E8ZB HeroCarousel_cover__QI8qE w-full h-full"
                  variants={maskVariants}
                  transition={{ duration: 0.8, ease: cubicBezier }}
                  style={{ willChange: 'transform' }}
                >
                  <video
                    className="HeroCarousel_video__an2L5 w-full h-full object-cover"
                    src={slide.video}
                    autoPlay
                    muted
                    playsInline
                    loop
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="HeroCarousel_textCarousel__BinP_ absolute bottom-10 left-10 text-white">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="HeroCarousel_textCarouselItem__xwPk5"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={textVariants}
          >
            <h1 className="Text_siteHeadline__Uxhfh text-4xl font-bold">
              <i>
                {slides[currentIndex].title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="CharAnimation_char__Fz3Ep inline-block"
                    variants={charVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05, ease: cubicBezier }}
                  >
                    {char}
                  </motion.span>
                ))}
              </i>
            </h1>
            <div className="HeroCarousel_next__en_zC mt-4">
              <p className="Text_caption__rFBR7">Next up</p>
              <p className="Text_caption__rFBR7 HeroCarousel_nextTitle__37rB6">
                {slides[(currentIndex + 1) % slides.length].nextTitle}
              </p>
              <motion.div
                className="HeroCarousel_progressBar___Uts5 h-1 bg-white mt-2"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: cubicBezier }}
              />
            </div>
            <motion.div
              className="HeroCarousel_cta__qcc5z mt-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ ease: cubicBezier }}
              onClick={handleNext}
            >
              <p className="Text_caption__rFBR7">Read article</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handlePrev}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
