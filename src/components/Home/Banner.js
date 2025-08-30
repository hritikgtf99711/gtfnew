
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Portfolio from './Portfolio';

const videoSources = [
  "./assets/video/video_1.mp4",
  "./assets/video/video_2.mp4", 
  "./assets/video/video_2.mp4"
];

const videoContent = [
  {
    title: "A Precious New Hybrids",
    nextUp: "All linked by trinity"
  },
  {
    title: "Revolutionary Design",
    nextUp: "Future innovation"
  },
  {
    title: "Digital Transformation",
    nextUp: "Beyond boundaries"
  }
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const bottomSectionRef = useRef(null);
  const width = useMotionValue('80%'); // Motion value for width animation

  // Autoscroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % videoSources.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mouse wheel event handler
  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      if (delta > 0) {
        // Wheel down: expand to full width
        width.set('100vw');
      } else if (delta < 0) {
        // Wheel up: revert to container width
        width.set('100%');
      }
    };

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [width]);

  // Parallax effect for video section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Mouse-based parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / 50;
    const moveY = (clientY - centerY) / 50;
    setMousePosition({ x: moveX, y: moveY });
  };

  const slideVariants = {
    enter: (direction) => ({
      clipPath: direction > 0 
        ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
        : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      // opacity: 0,
      x: direction > 0 ? 100 : -100
    }),
    center: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: (direction) => ({
      clipPath: direction < 0 
        ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
        : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      // opacity: 0,
      x: direction < 0 ? 100 : -100,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const smallVideoVariants = {
    enter: (direction) => ({
      clipPath: direction > 0 
        ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
        : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      opacity: 0,
      scale: 0.8
    }),
    center: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: (direction) => ({
      clipPath: direction < 0 
        ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
        : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const textVariants = {
    enter: {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)',
      scale: 0.95
    },
    center: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: 'blur(10px)',
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const nextUpVariants = {
    enter: {
      opacity: 0,
      x: 20,
      filter: 'blur(8px)'
    },
    center: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      filter: 'blur(8px)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const progressBarVariants = {
    active: {
      scale: 1.2,
      backgroundColor: '#ffffff',
      transition: { duration: 0.3 }
    },
    inactive: {
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transition: { duration: 0.3 }
    }
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % videoSources.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + videoSources.length) % videoSources.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    });
  };

  return (
    <section className="relative h-screen  bg-black" ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className='absolute top-0 left-0 w-full z-30'>
        <div className='container mx-auto py-6 flex justify-start'>
          <figure className=''>
            <img src="./assets/img/logo.svg" alt="bg" className='w-[150px] h-full object-cover'/>
          </figure>
        </div>
      </div>
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
            style={{
              y: parallaxY,
              scale: parallaxScale,
              x: mousePosition.x,
              y: mousePosition.y
            }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay={isPlaying}
              loop
              muted
              playsInline
              src={videoSources[currentIndex]}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        <div className='container m-auto h-[100%] relative'>
          <div className='absolute flex w-[100%] justify-between items-baseline bottom-[30%] right-0 z-20 text-center text-white'>
            <div className='video_content_container items-center flex gap-[30px] basis-[46%]'>
              <div className="relative w-[140px] h-[180px] overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={`small-${currentIndex}`}
                    custom={direction}
                    variants={smallVideoVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                    style={{
                      x: mousePosition.x * 0.5,
                      y: mousePosition.y * 0.5
                    }}
                  >
                    <video
                      className="w-full h-full object-cover"
                      autoPlay={isPlaying}
                      loop
                      muted
                      playsInline
                      src={videoSources[currentIndex]}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  <motion.h2
                    key={`title-${currentIndex}`}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className='text-[54px] leading-[normal] text-start notoserif'
                    style={{
                      x: mousePosition.x * 0.3,
                      y: mousePosition.y * 0.3
                    }}
                  >
                    {videoContent[currentIndex].title.split(' ').map((word, index) => (
                      <motion.span
                        key={`${currentIndex}-${index}`}
                        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          filter: 'blur(0px)',
                          transition: { 
                            delay: 0.4 + (index * 0.1),
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          y: -20, 
                          filter: 'blur(5px)',
                          transition: { duration: 0.3 }
                        }}
                        className="inline-block mr-3"
                      >
                        {word}
                        {index === 1 && <span className='lg:block hidden'></span>}
                      </motion.span>
                    ))}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            <div className='flex relative items-center justify-center gap-4'>
              <div className='mr-4 text-right relative overflow-hidden'>
                <div className='relative'>
                  <motion.span 
                    initial={{ opacity: 0.7, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5 }}
                    className='block text-[14px]'
                  >
                    Next up
                  </motion.span>
                  <div className="relative h-[22px] overflow-hidden">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.h3
                        key={`nextup-${currentIndex}`}
                        variants={nextUpVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className='text-[18px] absolute top-0 left-0 w-full'
                        style={{
                          x: mousePosition.x * 0.2,
                          y: mousePosition.y * 0.2
                        }}
                      >
                        {videoContent[currentIndex].nextUp}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="absolute bottom-[50px] left-0 w-full h-[1px] bg-white/20 z-20">
                  <motion.div
                    className="h-[1px] bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    key={currentIndex}
                  />
                </div>
              </div>
              
              <div className='flex gap-[15px] items-center justify-center'>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                  className="basis-[50px] z-20 transition-colors p-2 rounded-full"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <div className='border-r-[0.5px] border-[#fff] h-[40px]'></div>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="basis-[50px] right-6 top-1/2 z-20 transition-colors p-2 rounded-full"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </div>  
          </div>
        </div>


        <motion.div
          animate={{ x: [-10, 0, -10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-1 h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent"
        />
        <motion.div
          animate={{ x: [10, 0, 10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-1 h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent"
        />

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {videoSources.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="w-2 h-2 rounded-full"
              variants={progressBarVariants}
              animate={index === currentIndex ? 'active' : 'inactive'}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-full h-full rounded-full"
                initial={{ width: "0%" }}
                animate={index === currentIndex ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </motion.button>
          ))}
        </div>

      </div>
      <Portfolio/>
      
    </section>
  );
}