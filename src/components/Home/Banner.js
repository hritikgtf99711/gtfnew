"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../header/Index";

const videoSources = [
  "./assets/video/banner_video_1.mp4",
  "./assets/video/banner_video_2.mp4",
  "./assets/video/banner_video_3.mp4",
   "./assets/video/banner_video_1.mp4",
  "./assets/video/banner_video_2.mp4",
  "./assets/video/banner_video_3.mp4",

  "./assets/video/banner_video_2.mp4",
  "./assets/video/banner_video_3.mp4",
 
];

const videoContent = [
  { title: "Creative Alchemy", nextUp: "All linked by trinity" },
  { title: "Trinity Design", nextUp: "Future innovation" },
  { title: "Precious Hybrid", nextUp: "Beyond boundaries" },
  { title: "Venice Vibes", nextUp: "Artistic flow" },
  { title: "Time Illusion", nextUp: "Timeless beauty" },
  { title: "Creative Alchemy", nextUp: "All linked by trinity" },
  { title: "Trinity Design", nextUp: "Future innovation" },
  { title: "Precious Hybrid", nextUp: "Beyond boundaries" },
  { title: "Venice Vibes", nextUp: "Artistic flow" },
  { title: "Time Illusion", nextUp: "Timeless beauty" },
];

const parentVariant = {
  initial: {
    scale: 1,
    skewX: "0deg",
    translateX: "110%",
    willChange: "transform",
  },
  active: {
    scale: 1.03784,
    skewX: "4deg",
    translateX: "0%",
    willChange: "transform",
    transition: { duration: 1.2, ease: "linear" },
  },
  prev: {
    scale: 1.03784,
    skewX: "4deg",
    translateX: "-110%",
    willChange: "transform",
    transition: { duration: 2.2, ease: "linear" },
  },
  next: {
    scale: 1.03784,
    skewX: "4deg",
    translateX: "110%",
    willChange: "transform",
    transition: { duration: 3, ease: "linear" },
  },
};
const childVariant = {
  initial: { scale: 1, skewX: "-4deg", translateX: "-110%", willChange: "transform" },
  active: {
    scale: 1.03784,
    skewX: "-4deg",
    translateX: "0%",
    willChange: "transform",
    transition: { duration: 1.2, ease: "linear" },
  },
  prev: {
    scale: 1.03784,
    skewX: "-4deg",
    translateX: "110%",
    willChange: "transform",
    transition: { duration: 2.2, ease: "linear" },
  },
  next: {
    scale: 1.03784,
    skewX: "-4deg",
    translateX: "-110%", // <-- Fix: add this line
    willChange: "transform",
    transition: { duration: 3, ease: "linear" },
  },
};
const smallVideoVariants = {
  initial: {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    opacity: 0,
    scale: 0.8,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
  animate: {
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
  initial: { opacity: 0, x: 20, filter: "blur(8px)" },
  animate: {
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

export default function Banner({ bannervideoref }) {
    const SLIDE_DURATION = 5000; // 5 seconds per slide

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);
useEffect(() => {
  setProgress(0);

  const video = videoRef.current;
  if (!video) return;

  // Reset video to start
  video.currentTime = 0;
  video.play();

  const handleTimeUpdate = () => {
    if (video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleEnded = () => {
    nextSlide();
  };

  video.addEventListener("timeupdate", handleTimeUpdate);
  video.addEventListener("ended", handleEnded);

  return () => {
    video.removeEventListener("timeupdate", handleTimeUpdate);
    video.removeEventListener("ended", handleEnded);
  };
}, [activeIndex]);

  useEffect(() => {
    const onNext = () => {
      setActiveIndex((prev) => (prev + 1) % videoSources.length);
      setProgress(0);
    };
    window.addEventListener("bg:next", onNext);
    return () => window.removeEventListener("bg:next", onNext);
  }, []);

  const { scrollYProgress } = useScroll({
    target: bannervideoref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const nextSlide = () => {
    setActiveIndex((p) => (p + 1) % videoSources.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setActiveIndex((p) => (p - 1 + videoSources.length) % videoSources.length);
    setProgress(0);
  };

  const getSlideState = (index, activeIndex) => {
    if (index === activeIndex) return "active";
    if (index === (activeIndex - 1 + videoSources.length) % videoSources.length)
      return "prev";
    return "next";
  };

  return (
    <section
      className="h-[100vh] relative pb-[16vw] h-[100svh]"
      ref={bannervideoref}
    >
      <div className="HeroCarousel_heroCarousel__BYein HeroCarousel_isInView__UEmOO">
        <div className="HeroCarousel_carouselWrapper__Mis0X">
          <div className="HeroCarousel_bgCarousel__sRuW8">
            <div className="HeroCarousel_videos__jjh4t">
              <AnimatePresence initial={false} mode="popLayout">
                {[
                  activeIndex,
                  (activeIndex - 1 + videoSources.length) % videoSources.length,
                  (activeIndex + 1) % videoSources.length,
                ].map((index) => {
                  const state = getSlideState(index, activeIndex);
                  return (
                    <motion.div
                      key={index}
                      variants={parentVariant}
                      initial="initial"
                      animate={state}
                      exit="next" // when unmount, slide out to right
                      className={`HeroCarousel_videoMask__9E8ZB ${
                        state === "active"
                          ? "HeroCarousel_active__Xmb4Z"
                          : state === "prev"
                          ? "HeroCarousel_prev__j3ZjV"
                          : ""
                      }`}
                    >
                      <motion.div
                        variants={childVariant}
                        initial="initial"
                        animate={state}
                        className="HeroCarousel_videoMask__9E8ZB HeroCarousel_cover__QI8qE"
                        style={{ y }}
                      >
                        <video
                          ref={index === activeIndex ? videoRef : null}
                          className="HeroCarousel_video__an2L5"
                          autoPlay
                          muted
                          playsInline
                          loop={false}
                          src={videoSources[index]}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="absolute flex bottom-[12vw] w-[86%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-between items-end right-0 z-20 text-white">
          <div className="video_content_container items-center flex gap-[30px] basis-[45%]">
            <div className="relative basis-[154px] shrink-0 grow-0 h-[190px] overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`small-${activeIndex}`}
                  variants={smallVideoVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="inset-0 w-full h-full"
                >
                  <video
                    className="w-full h-full object-cover"
                    autoPlay={isPlaying}
                    loop
                    muted
                    playsInline
                    src={videoSources[activeIndex]}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative">
              <AnimatePresence initial={false} mode="wait">
                <motion.h2
                  key={`title-${activeIndex}`}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-[90px] leading-[110px] tracking-[1px] uppercase"
                >
                  {videoContent[activeIndex].title}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>
          <div className="basis-[228px] gap-4">
            <div className="text-right relative overflow-hidden">
              <div className="flex gap-[5px] items-center justify-between relative mb-[15px]">
                <div className="flex-1 text-start">
                  <span className="block text-[14px] opacity-90">Next up</span>
                  <div className="relative h-[22px] overflow-hidden">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.h3
                        key={`nextup-${activeIndex}`}
                        variants={nextUpVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-[18px] absolute top-0 left-0 w-full pr-[4px]"
                      >
                        {videoContent[activeIndex].nextUp}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex gap-[15px] items-center justify-center">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevSlide}
                    className="basis-[30px] z-20 cursor-pointer transition-colors p-[5px]"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                  <div className="border-r-[0.5px] border-[#fff] h-[35px]" />
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                    className="basis-[30px] z-20 cursor-pointer transition-colors p-[5px]"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
            <div className="bottom-[240px] left-0 w-full h-[1px] bg-white/20 z-20">
              <motion.div
  className="h-[1px] bg-white duration-300"
  style={{ width: `${progress}%` }}
  transition={{ duration: 0.1, ease: "linear" }}
/>
            </div>
          </div>
        </div>
      </div>
                    <div className="absolute top-0 left-0 bg-[#000] opacity-[.5] h-[100%] w-[100%]"></div>
    </section>
  );
}
