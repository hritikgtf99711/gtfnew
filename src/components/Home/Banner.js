"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import Header from "../header/Index";

const videoSources = [
  "./assets/video/banner_video_4.mp4",
  "./assets/video/banner_video_5.mp4",
  "./assets/video/banner_video_6.mp4",
  "./assets/video/banner_video_4.mp4",
  "./assets/video/banner_video_5.mp4",
  "./assets/video/banner_video_6.mp4",
  "./assets/video/banner_video_5.mp4",
  "./assets/video/banner_video_6.mp4",
];

const videoContent = [
  { title: "Creative Alchemy", nextUp: "All linked by trinity", link: "/creative-alchemy" },
  { title: "Trinity Design", nextUp: "Future innovation", link: "/trinity-design" },
  { title: "Precious Hybrid", nextUp: "Beyond boundaries", link: "/precious-hybrid" },
  { title: "Venice Vibes", nextUp: "Artistic flow", link: "/venice-vibes" },
  { title: "Time Illusion", nextUp: "Timeless beauty", link: "/time-illusion" },
  { title: "Creative Alchemy", nextUp: "All linked by trinity", link: "/creative-alchemy" },
  { title: "Trinity Design", nextUp: "Future innovation", link: "/trinity-design" },
  { title: "Precious Hybrid", nextUp: "Beyond boundaries", link: "/precious-hybrid" },
  { title: "Venice Vibes", nextUp: "Artistic flow", link: "/venice-vibes" },
  { title: "Time Illusion", nextUp: "Timeless beauty", link: "/time-illusion" },
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
  initial: {
    scale: 1,
    skewX: "-4deg",
    translateX: "-110%",
    willChange: "transform",
  },
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
    translateX: "-110%",
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

export default function Banner({ sectionRef }) {
  const SLIDE_DURATION = 5000; // 5 seconds per slide

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isCursorInside, setIsCursorInside] = useState(false); // New state to track if cursor is inside Banner
  const videoRef = useRef(null);
  const bannerRef = useRef(null); // Ref for the Banner container
  const progressIntervalRef = useRef(null);

  const bgVariants = {
    initial: {
      scaleX: 0,
      transformOrigin: "right",
    },
    hover: {
      scaleX: 1,
      transformOrigin: "left",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      const offsetX = 50; // Move button 50px to the right of the cursor
      const offsetY = 50; // Move button 50px below the cursor
      setCursorPosition({ x: e.clientX + offsetX, y: e.clientY + offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isCursorInside]);

  // Video playback and progress logic
  useEffect(() => {
    setProgress(0);

    const video = videoRef.current;
    if (!video) return;

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

  // const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

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
      className="banner_section h-[100vh] relative pb-[16vw] h-[100svh]  cursor-pointer"
      ref={sectionRef}
      onMouseEnter={() => setIsCursorInside(true)} // Show button when cursor enters
      onMouseLeave={() => {
        setIsCursorInside(false); // Hide button when cursor leaves
        setIsHovering(false); // Reset hover state
      }}
    >
      {/* Conditionally render the "Read More" button */}
      {isCursorInside && (
        <motion.div
          className="fixed z-50"
          style={{
            x: cursorPosition.x - 20, // Adjust for cursor size
            y: cursorPosition.y - 20,
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
            delay: 0.3,
          }}
      >
        <div className="py-[8px] border-[1px] border-[#fff] cursor-pointer group px-[15px] rounded-[0] flex items-center justify-center" onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
          <span className=" text-[14px] uppercase font-semibold  group-hover:translate-y-[-4px] text-white tracking-[2px]">
            Read More
          </span>
        </div>
      </motion.div>

      )}

      <div className="HeroCarousel_heroCarousel__BYein HeroCarousel_isInView__UEmOO  cursor-pointer hero_carousel z-[99]">
        <div className="HeroCarousel_carouselWrapper__Mis0X  cursor-pointer z-[9]">
          <div className="HeroCarousel_bgCarousel__sRuW8  cursor-pointer z-[99]">
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
                      exit="next"
                      className={`HeroCarousel_videoMask__9E8ZB cursor-pointer ${
                        state === "active"
                          ? "HeroCarousel_active__Xmb4Z"
                          : state === "prev"
                          ? "HeroCarousel_prev__j3ZjV"
                          : ""
                      }`}
                      onClick={() => window.location.href = videoContent[index].link}
                    >
                      <motion.div
                        variants={childVariant}
                        initial="initial"
                        animate={state}
                        className="HeroCarousel_videoMask__9E8ZB HeroCarousel_cover__QI8qE"
                        // style={{ y }}
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
        <div className="absolute  flex bottom-[12vw] w-[85%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-between items-end right-0 z-[9] text-white">
          <div className="video_content_container items-center flex gap-[50px] basis-[45%]">
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
                  className="text-[130px] leading-[110px] tracking-[1px] uppercase italic"
                >
                  {videoContent[activeIndex].title}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>
          <div
            className="basis-[228px] cursor-normal gap-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="text-right relative overflow-hidden">
              <div className="flex gap-[5px] items-center justify-between relative mb-[15px]">
                <div className="flex-1 text-start">
                  <span className="block text-[14px] opacity-90 uppercase tracking-[1px]">Next up</span>
                  <div className="relative h-[22px] overflow-hidden">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.h3
                        key={`nextup-${activeIndex}`}
                        variants={nextUpVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-[16px] absolute top-0 left-0 w-full pr-[4px] uppercase tracking-[1px]"
                      >
                        {videoContent[activeIndex].nextUp}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-0 relative nav_btns">
                  <motion.button
                    initial={{color:'#fff'}}
                    whileHover={{color:'#000'}}
                    transition={{ duration: 0.1 }}
                    onClick={prevSlide}
                    className="relative w-[40px] h-[40px] flex items-center justify-center z-20 cursor-pointer  overflow-hidden left_btn"
                  >
                      <IoMdArrowDropleft size={20} className="relative z-10" />
                  </motion.button>

                  {/* Right Button */}
                  <motion.button
                    initial={{color:'#fff'}}
                    whileHover={{color:'#000'}}
                    transition={{ duration: 0.1 }}
                    onClick={nextSlide}
                    className="relative w-[40px] h-[40px] z-20 cursor-pointer flex items-center justify-center overflow-hidden right_btn"
                  >
                    <IoMdArrowDropright size={20} className="relative z-10" />
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
        <h2 className="absolute text-[16px] tracking-[1.5px] uppercase bottom-[220px] max-w-[85%] w-full left-1/2 -translate-x-1/2 z-[9] text-white flex items-center">All Chapters <IoMdArrowDropdown /></h2>
      </div>
      {/* <div className="fixed top-0 left-0 bg-[#000] opacity-[.5] h-[100%] w-[100%]"></div> */}
    </section>
  );
}
