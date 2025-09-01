"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../header/Index";

const videoSources = [
  "./assets/video/main_video.mp4",
  "./assets/video/video_banner_2.mp4",
  "./assets/video/video_banner_3.mp4",
];

const videoContent = [
  { title: "A Precious New Hybrids", nextUp: "All linked by trinity" },
  { title: "Revolutionary Design", nextUp: "Future innovation" },
  { title: "Digital Transformation", nextUp: "Beyond boundaries" },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);

  // Listen for "bg:next" events fired by front sections when they shrink on exit
  useEffect(() => {
    const onNext = () =>
      setCurrentIndex((prev) => (prev + 1) % videoSources.length);
    window.addEventListener("bg:next", onNext);
    return () => window.removeEventListener("bg:next", onNext);
  }, []);

  // Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const slideVariants = {
    enter: (d) => ({
      clipPath:
        d > 0
          ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
          : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      x: d > 0 ? 100 : -100,
    }),
    center: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (d) => ({
      clipPath:
        d < 0
          ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
          : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      x: d < 0 ? 100 : -100,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const smallVideoVariants = {
    enter: (d) => ({
      clipPath:
        d > 0
          ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
          : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      scale: 1,
      transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (d) => ({
      clipPath:
        d < 0
          ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
          : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      opacity: 0,
      scale: 0.8,
      transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
    center: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(10px)",
      scale: 1.05,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const nextUpVariants = {
    enter: { opacity: 0, x: 20, filter: "blur(8px)" },
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      x: -20,
      filter: "blur(8px)",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((p) => (p + 1) % videoSources.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((p) => (p - 1 + videoSources.length) % videoSources.length);
  };

  return (
    <section className="relative h-screen bg-black" ref={sectionRef}>
      <Header />
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
            style={{ y: parallaxY, scale: parallaxScale }}
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

        <div className="container m-auto h-full relative">
          <div className="absolute flex w-full justify-between items-baseline bottom-[30%] right-0 z-20 text-white">
            <div className="video_content_container items-center flex gap-[30px] basis-[46%]">
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
                    className="text-[54px] leading-normal text-start notoserif"
                  >
                    {videoContent[currentIndex].title.split(" ").map((word, idx) => (
                      <motion.span
                        key={`${currentIndex}-${idx}`}
                        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: { delay: 0.4 + idx * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                        }}
                        exit={{ opacity: 0, y: -20, filter: "blur(5px)", transition: { duration: 0.3 } }}
                        className="inline-block mr-3"
                      >
                        {word}
                        {idx === 1 && <span className="lg:block hidden" />}
                      </motion.span>
                    ))}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex relative items-center justify-center gap-4">
              <div className="mr-4 text-right relative overflow-hidden">
                <div className="relative">
                  <span className="block text-[14px] opacity-90">Next up</span>
                  <div className="relative h-[22px] overflow-hidden">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.h3
                        key={`nextup-${currentIndex}`}
                        variants={nextUpVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="text-[18px] absolute top-0 left-0 w-full"
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

              <div className="flex gap-[15px] items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                  className="basis-[50px] z-20 transition-colors p-2 rounded-full"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <div className="border-r-[0.5px] border-[#fff] h-[40px]" />
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="basis-[50px] z-20 transition-colors p-2 rounded-full"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Little side glows */}
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
      </div>
      {/* NOTE: Removed the nested <Portfolio /> here to avoid duplication */}
    </section>
  );
}
