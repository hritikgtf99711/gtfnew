"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";

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
    offset: ["start end", "end start"],
  });

  // Scroll handling for heading clip path
  const { scrollYProgress: headingScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["0.2 1", "0.3 0"],
  });

  const { scrollYProgress: headingClipProgress } = useScroll({
    target: sectionRef,
    offset: ["0.3 1", "1 1"],
  });

  // Smooth spring for section scroll
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 30 });

  // Smooth spring for heading clip scroll
  const smoothHeadingProgress = useSpring(headingScrollProgress, { stiffness: 200, damping: 50 });
  const smoothHeadingClipProgress = useSpring(headingClipProgress, { stiffness: 200, damping: 50 });

  const [paddingInput, setPaddingInput] = useState([0, 0.4, 1]);
  const [scaleXOutput, setScaleXOutput] = useState([0.8, 1, 0.8]); // Initial guess, will be updated

  // Section-level transforms
  const paddingTop = useTransform(smoothProgress, [0, 0.3], [0, 150]);
  const scaleTransform = useTransform(smoothProgress, [0.1, 0.2, 0.3, 0.4, 0.7, 1], [0.82, 0.89, 1, 1, 1, 0.85]);
  const scaleXTransform = useTransform(smoothProgress, paddingInput, scaleXOutput);

  // Heading clip path and opacity
  const subHeadingClip = useTransform(
    smoothHeadingClipProgress,
    [0, 0.1, 0.3, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const subHeadingOpacity = useTransform(smoothHeadingProgress, [0, 0.1, 0.7, 1], [0, 1, 1, 0]);
  const subHeadingHeight = useTransform(subHeadingOpacity, [0, 1], [0, 24]);
  const subHeadingMargin = useTransform(smoothHeadingProgress, [0, 1], [0, 100]);
  const subHeadingMarginTop = useTransform(smoothHeadingProgress, [0, 1], [0, 100]);
  const subHeadingY = useTransform(smoothHeadingProgress, [0, 0.2], [40, 0])

  const headingClip = useTransform(
    smoothHeadingClipProgress,
    [0, 0.1, 0.3, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const headingOpacity = useTransform(smoothHeadingProgress, [0, 0.1, 0.7, 1], [0, 1, 1, 0]);
  const headingHeight = useTransform(headingOpacity, [0, 1], [0, 80]);
  const headingMargin = useTransform(smoothHeadingProgress, [0, 1], [0, 100])

  const headingY = useTransform(smoothHeadingProgress, [0, 0.2], [100, 0])

  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1920);

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  // Compute dynamic padding ranges and scaleX after loading and on resize
  useEffect(() => {
    if (!isLoading && sectionRef.current) {
      const VH = window.innerHeight;
      const SH = sectionRef.current.offsetHeight;
      const p1 = VH / (SH + VH);
      const p2 = (SH + VH / 2) / (SH + VH);
      setPaddingInput([0, p1, p2, 1]);

      // Base padding values in px
      const basePaddings = [200, 0, 0, 200];
      // Convert to scaleX: (vw - 2 * padding) / vw, with a min scale to avoid zero/negative
      const newScaleXOutput = basePaddings.map(p => Math.max(0.1, (vw - 2 * p) / vw));
      setScaleXOutput(newScaleXOutput);
    }
  }, [isLoading, vw]);

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

  // Show alert when section reaches top: 0
  useEffect(()=>{
    scrollYProgress.on('change', (v)=>{
      if(v <= 0.02){ // Use a small threshold to account for minor scroll variations
        alert("Section has reached the top of the viewport!");
      }
    })
  }, [scrollYProgress])

  useEffect(() => {
    const unsub = smoothProgress.on("change", (p) => {
      if (p <= 0.02) {
        if (resetArmedRef.current) {
          onResetTop?.();
          resetArmedRef.current = false;
        }
      } else if (p >= 0.06) {
        resetArmedRef.current = true;
      }
    });
    return () => unsub();
  }, [smoothProgress, onResetTop]);

  const wasCenteredRef = useRef(false);

  useEffect(() => {
    const unsub = scaleXTransform.on("change", (v) => {
      const isCenteredNow = v > 0.99; // Close to 1
      if (isCenteredNow && !wasCenteredRef.current) {
        wasCenteredRef.current = true;
        onFocus?.();
      }
      if (!isCenteredNow && wasCenteredRef.current) {
        wasCenteredRef.current = false;
      }
    });
    return () => unsub();
  }, [scaleXTransform, onFocus]);

  return (
    <motion.div
      ref={sectionRef}
      className={`${isFirst && "mt-[-200px]"} mb-[60vh] relative z-[99] animated_section min-h-[calc(100vh+200px)]`}
      style={{
        scaleX: scaleXTransform,
        willChange: "transform",
      }}
    >
      <motion.div
        ref={innerSecRef}
        className={`relative bg-white z-9 items-center h-full pt-[40px]`}
        style={{
          // willChange: "transform",
          // scaleX: scaleXTransform,
          // paddingTop, // Uncomment if needed, but consider replacing with scaleY for optimization
        }}
      >
        <div className={`relative max-w-full box_padding`}>
          <div className="sticky top-0">
            <div className="relative w-full flex flex-col justify-center items-center">
              {heading && (
                <div className="heading text-center text-[#000] flex flex-col mb-[80px]">
                  <motion.h2
                  className="uppercase font-semibold tracking-[3px]"
                    style={{
                      clipPath: subHeadingClip,
                      y: subHeadingY,
                      opacity: subHeadingOpacity,
                      height: subHeadingHeight,
                      marginBottom: subHeadingMargin,
                      marginTop: subHeadingMarginTop,
                      overflow: "hidden",
                      willChange: "clip-path, transform, opacity, height, marginBottom",
                    }}
                  >
                    {subHeading}
                  </motion.h2>
                  <motion.h2
                    style={{
                      clipPath: headingClip,
                      y: headingY,
                      opacity: headingOpacity,
                      height: headingHeight,
                      overflow: "hidden",
                      marginBottom: headingMargin,
                      willChange: "clip-path, transform, opacity, height, marginBottom",
                    }}
                    className="text-[64px] uppercase tracking-[3px] font-normal"
                  >
                    {heading}
                  </motion.h2>
                </div>
              )}
              <motion.div
                className="relative w-full  z-10"
                // initial={{ opacity: 0 }}
                // animate={{
                //   opacity: isLoading ? 0 : 1,
                //   transition: { duration: 0.5, ease: "easeInOut" },
                // }}
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