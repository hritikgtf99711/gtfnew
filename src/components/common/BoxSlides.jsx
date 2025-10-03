"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useTransform, useScroll, useSpring, useMotionValue } from "framer-motion";

export default function BoxSlides({
  children,
  via,
  isHidden,
  hide,
  setscaleTransform,
  subHeading,
  heading,
  isFirst,
  onActive,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const innerSecRef = useRef(null);

  // Local scroll handling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],  // section top visible → section bottom visible
  });

  const { scrollYProgress1 } = useScroll({
    target:innerSecRef,
    offset: ["start end", "end start"],
  })

  // Smooth spring to avoid jerky values
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30});
  const smoothProgress1 = useSpring(scrollYProgress1, { stiffness: 200, damping: 30});

  const paddingLeftRight = useTransform(
    smoothProgress,
    [0, 0.3],   // 0% → 80% scroll progress of this section
    [150, 0]    // px
  );

  const paddingTopBottom = useTransform(
    smoothProgress1,
    [0, 0.3],   // 0% → 80% scroll progress of this section
    [0, 150]    // px
  );

  // Section-level transforms for scale based on scroll progress
  const scaleTransform = useTransform(
    smoothProgress,
    [0.1, 0.2, 0.3, 0.4, 0.7, 1],
    [0.82, 0.89, 1, 1, 1, 0.85]
  );

  const subHeadingClip = useTransform(
    smoothProgress,
    [0, 0.6, 0.6, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );
  const subHeadingOpacity = useTransform(smoothProgress, [0, 0.15, 0.6, 1], [0, 1, 1, 0]);

  const headingClip = useTransform(
    smoothProgress,
    [0, 0.6, 0.6, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );
  const headingOpacity = useTransform(smoothProgress, [0, 0.25, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setIsTransitioning(true);
      setIsLoading(false);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (setscaleTransform) setscaleTransform(scaleTransform);
  }, [scaleTransform, setscaleTransform]);

  // Motion value for dynamic padding
  // const paddingX = useMotionValue(150);
  // const smoothPaddingX = useSpring(paddingX, { stiffness: 12000, damping: 10 });

  

  return (
    <motion.div
      ref={sectionRef}
      className={`${isFirst && 'mt-[-290px]' } relative z-[9] animated_section`}
      animate={{
        scale: [1, 1.1, 0.95, 1.05, 1], // Elastic scale sequence
        rotate: [0, 2, -1, 0.5, 0], // Optional: add slight rotation for more elasticity
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
        mass: 1,
        duration: 0.21,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0,
        ease: [0.68, -0.55, 0.265, 1.55], // Custom elastic easing curve
      }}
      style={{
        scale: scaleTransform,
        willChange: "transform",
      }}
      // style={{
      //   paddingLeft: paddingLeftRight,
      //   paddingRight: paddingLeftRight,
      //   transition:'padding 0.3s easeInOut'
      // }}
    >
      <div ref={innerSecRef} className={`bg-white z-9 flex justify-center items-center`}
        
      >
        <div className={`relative max-w-full box_padding ${!via && "pt-[100vh]"}`}>
            <div className="sticky top-0">
              <div className="relative w-full h-screen flex flex-col justify-center items-center">
                {heading && (
                  <div className="heading pt-[50px] text-center text-[#000] overflow-hidden flex flex-col gap-2">
                    <motion.span style={{ clipPath: subHeadingClip, opacity: subHeadingOpacity }}>
                      {subHeading}
                    </motion.span>
                    <motion.h2 style={{ clipPath: headingClip, opacity: headingOpacity }} className="text-[32px]">
                      {heading}
                    </motion.h2>
                  </div>
                )}
                <motion.div
                  className="relative w-full h-full z-10"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isLoading ? 0 : 1,
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }}
                >
                  {children}
                </motion.div>
              </div>
            </div>
          </div>
      </div>
    </motion.div>
  );
}