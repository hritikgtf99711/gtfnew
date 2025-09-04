"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import Portfolio from "./BoxAnimation";

export default function BoxSlides({
  children,
  via,
  index,
  bannervideoref,
  isHidden,
  hide,
  setscaleTransform,
  subHeading,
  sectionRef,
  smoothScrollProgress,
  heading,
}) {
  const [activeImage, setActiveImage] = useState(null);

  const changesImageArr = [
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img_2.jpg",
    "/assets/img/portfolio/portfolio_4.jpg",
    "/assets/img/portfolio/portfolio_5.jpg",
  ];



  // Scale transforms
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

  // Text clipping transforms
  const subHeadingClip = useTransform(
    smoothScrollProgress,
    [0, 0.2, 0.5, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );

  const subHeadingOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.15, 0.6, 1],
    [0, 1, 1, 0]
  );

  const headingClip = useTransform(
    smoothScrollProgress,
    [0, 0.3, 0.6, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );

  const headingOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.25, 0.7, 1],
    [0, 1, 1, 0]
  );

  const scrollYImage = useTransform(
    smoothScrollProgress,
    [0, 0.25, 0.7, 1],
    [0, 1, 1, 0]
  );
  const isInView = useInView(sectionRef, { amount: 0.6 });

  useEffect(() => {
    if (setscaleTransform) setscaleTransform(scaleTransform);
  }, [scaleTransform]);

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
          >
            {/* Chapter Text */}
            <div
              className={`text-white ${
                hide === 1 ? (isHidden ? "hidden" : "") : "hidden"
              } chapter_text flex gap-[2px] h-[100%] mb-[30px]`}
            >
              <span className="text-white">ALL CHAPTERS</span>
              <img src="./assets/img/downarrow.svg" alt="" width={"10"} />
            </div>

            <div className="flex bg-white flex-col h-[100vh] m-auto overflow-hidden mx-auto">
              {heading && (
                <div className="heading pt-[50px] text-center text-[#000] overflow-hidden flex flex-col gap-2">
                  <motion.span
                    className="text-[#000]"
                    style={{
                      clipPath: subHeadingClip,
                      opacity: subHeadingOpacity,
                    }}
                  >
                    {subHeading}
                  </motion.span>

                  <motion.h2
                    className="text-[32px] text-[#000]"
                    style={{
                      clipPath: headingClip,
                      opacity: headingOpacity,
                    }}
                  >
                    {heading}
                  </motion.h2>
                </div>
              )}

              {/* Children */}
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

        {/* Background Images */}
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
