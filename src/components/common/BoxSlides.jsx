import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useSpring,
  scale,
} from "framer-motion";
import SparkleBackgroundPortal from "./Sparklingbg";

export default function BoxSlides({ children, via, index, bannervideoref, isHidden, hide,setscaleTransform }) {
  const sectionRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const changesImageArr = [
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img_2.jpg",
    "/assets/img/portfolio/portfolio_4.jpg",
    "/assets/img/portfolio/portfolio_5.jpg",
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const smoothScrollProgress = useSpring(scrollYProgress, springConfig);

  const scaleTransform = useTransform(
    smoothScrollProgress,
    [0, 0.3, 0.7, 1],
    [0.85, 1, 1, 0.85]
  );

  const imageScaleTransform = useTransform(
    smoothScrollProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [1.15, 1.05, 1, 1.05, 1.2]
  );

  const imageYTransform = useTransform(
    smoothScrollProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -5, -8, -5, 15]
  );

  const overlayOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.3, 0.7, 1],
    [0.2, 0.15, 0.25, 0.35]
  );

  const imageRotation = useTransform(
    smoothScrollProgress,
    [0, 0.5, 1],
    [-0.5, 0, 0.8]
  );

  
  const isInView = useInView(sectionRef, { amount: 0.6 });

  useEffect(()=>{

  },[isInView])
  useEffect(()=>{
setscaleTransform(scaleTransform)
  },[scaleTransform])

  return (
    <div className="mt-[-290px]">
      <div
  ref={sectionRef}
  className={`relative h-[220vh] box_padding ${!via && "pt-[100vh]"} white_color_animation`}
>
    <div className="sticky top-0 h-screen">
        <motion.div
          className="relative"
          style={{
            scale: scaleTransform,
            willChange: "transform",
            transformOrigin: "center center",
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div
            className={`text-white ${
              hide === 1 ? (isHidden ? "hidden" : "") : "hidden"
            } chapter_text flex gap-[2px] mb-[30px]`}
          >
            <span className="text-white">ALL CHAPTERS</span>
            <img src="./assets/img/downarrow.svg" alt="" width={"10"} />
          </div>
          <div className="flex bg-white h-[100vh] m-auto overflow-hidden mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2,
              }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="fixed inset-0 z-[-1]">
        <AnimatePresence mode="wait">
          {activeImage && (
            <motion.img
              key={activeImage}
              src={activeImage}
              alt="Background"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}