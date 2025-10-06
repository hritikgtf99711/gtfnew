"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring, vh } from "framer-motion";
import SparkleBackgroundPortal from "./Sparklingbg";

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
  isClient,
  onFocus,  
  onResetTop,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const innerSecRef = useRef(null);
  const resetArmedRef = useRef(true);

  // Scroll handling for section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // section top visible → section bottom visible
  });

  // Scroll handling for heading clip path
  const { scrollYProgress: headingScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["0.5 1", "1.2 1"], // Adjusted: Start at 30% from top, end at 10% from top
  });

  // Smooth spring for section scroll
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Smooth spring for heading clip scroll
  const smoothHeadingProgress = useSpring(headingScrollProgress, { stiffness: 200, damping: 30 });

  const [paddingInput, setPaddingInput] = useState([0, 0.4, 1]);
  const [paddingOutput, setPaddingOutput] = useState([200, 0, 200]);

  // Section-level transforms
  const paddingLeftRight = useTransform(smoothProgress, paddingInput, paddingOutput);
  const paddingTop = useTransform(smoothProgress, [0, 0.3], [0, 150]);
  const scaleTransform = useTransform(smoothProgress, [0.1, 0.2, 0.3, 0.4, 0.7, 1], [0.82, 0.89, 1, 1, 1, 0.85]);

  // Heading clip path and opacity
  const subHeadingClip = useTransform(
    smoothHeadingProgress,
    [0, 0.3, 0.7, 1], // Adjusted timing for smoother transition
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );
  const subHeadingOpacity = useTransform(smoothHeadingProgress, [0, 0.1, 0.7, 1], [0, 1, 1, 0]);
  const subHeadingHeight = useTransform(subHeadingOpacity, [0, 1], [0, 24]); // Assuming subheading font size ~16px + padding/margin
  const subHeadingMargin = useTransform(smoothHeadingProgress, [0, 1], [0, 100]); // Assuming subheading font size ~16px + padding/margin
  const subHeadingMarginTop = useTransform(smoothHeadingProgress, [0, 1], [0, 100]); // Assuming subheading font size ~16px + padding/margin
  const subHeadingY = useTransform(smoothHeadingProgress, [0, 0.2], [40, 0])

  const headingClip = useTransform(
    smoothHeadingProgress,
    [0, 0, 1, 1], // Adjusted timing for smoother transition
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]
  );

  const headingOpacity = useTransform(smoothHeadingProgress, [0, 0.1, 0.7, 1], [0, 1, 1, 0]);
  const headingHeight = useTransform(headingOpacity, [0, 1], [0, 80]); // Assuming heading font size ~64px + padding/margin
  const headingMargin = useTransform(smoothHeadingProgress, [0, 1], [0, 100])

  const headingY = useTransform(smoothHeadingProgress, [0, 0.2], [100, 0])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  // Compute dynamic padding ranges after loading (assuming height stabilizes)
  useEffect(()=>{
    if(!isLoading && sectionRef.current){
      const VH = window.innerHeight;
      const SH = sectionRef.current.offsetHeight;
      const p1 = VH / (SH + VH); // Reach 0 when section is fully in view (top at viewport top)
      const p2 = (SH + VH / 2) / (SH + VH); // Start reversing when bottom reaches 50% of viewport
      console.log('p1', p1, 'p2',p2);
      
      setPaddingInput([0, p1, p2, 1]);
      setPaddingOutput([200, 0, 0, 200]);
    }
  }, [isLoading])

  useEffect(() => {
    if (setscaleTransform) setscaleTransform(scaleTransform);
  }, [scaleTransform, setscaleTransform]);

  // Trigger background change when section is active in viewport
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.2 && v < 0.8 && onActive) {
        onActive();
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, onActive]);

  // Debug scroll progress for heading
  useEffect(() => {
    const unsubscribe = smoothHeadingProgress.on("change", (v) => {
      console.log("smoothHeadingProgress:", v);
    });
    return () => unsubscribe();
  }, [smoothHeadingProgress]);

  useEffect(() => {
    const unsub = smoothProgress.on("change", (p) => {
      // p ~ 0 means the section's "start end" alignment (top of section near bottom of viewport).
      // On reverse scroll to top, this hits ~0 again before the heading centers.
      if (p <= 0.02) {
        if (resetArmedRef.current) {
          onResetTop?.();         // tell parent to go back to -1
          resetArmedRef.current = false; // debounce till we move away again
        }
      } else if (p >= 0.06) {
        // re-arm once we’re meaningfully into the section
        resetArmedRef.current = true;
      }
    });
    return () => unsub();
  }, [smoothProgress, onResetTop]);

  const wasCenteredRef = useRef(false); // debounce flag

  useEffect(() => {
    const unsub = paddingLeftRight.on("change", (v) => {
      const isCenteredNow = Math.abs(v) < 1; // tolerance: 1px
      if (isCenteredNow && !wasCenteredRef.current) {
        wasCenteredRef.current = true;
        onFocus?.(); // tell parent "this slide is centered"
      }
      if (!isCenteredNow && wasCenteredRef.current) {
        // reset when it leaves center so it can fire again on re-entry
        wasCenteredRef.current = false;
      }
    });
    return () => unsub();
  }, [paddingLeftRight, onFocus]);

  return (
      <motion.div
        ref={sectionRef}
        className={`${isFirst && "mt-[-290px]"} mb-[60vh] relative z-[9] animated_section min-h-screen`} // Added min-h-screen
        style={{
          scale: scaleTransform,
          willChange: "transform",
          paddingLeft: paddingLeftRight,
          paddingRight: paddingLeftRight,
        }}
      >
      <motion.div
        ref={innerSecRef}
        className={`relative bg-white z-9  items-center`}
        // style={{
        //   willChange: "transform",
        //   paddingTop,
        // }}
      >
        {isClient && <SparkleBackgroundPortal/>}
        
        <div className={`relative max-w-full box_padding`}>
          <div className="sticky top-0">
            <div className="relative w-full flex flex-col justify-center items-center">
              {heading && (
                <div className="heading text-center text-[#000] flex flex-col mb-[80px]">
                  <motion.span
                    style={{
                      clipPath: subHeadingClip,
                      y: subHeadingY,
                      opacity: subHeadingOpacity,
                      height: subHeadingHeight,
                      marginBottom:subHeadingMargin,
                      marginTop:subHeadingMarginTop,
                      overflow: "hidden",
                      willChange: "clip-path, transform, opacity, height, marginBottom",
                    }}
                  >
                    {subHeading}
                  </motion.span>
                  <motion.h2
                    style={{
                      clipPath: headingClip,
                      y: headingY,
                      opacity: headingOpacity,
                      height: headingHeight,
                      overflow: "hidden",
                      marginBottom:headingMargin,
                      willChange: "clip-path, transform, opacity, height, marginBottom",
                    }}
                    className="text-[64px] uppercase tracking-[2px]"
                  >
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
      </motion.div>
    </motion.div>
  );
}