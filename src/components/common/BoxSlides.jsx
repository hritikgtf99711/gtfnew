"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useTransform, scale } from "framer-motion";

const frames = [
  { img: "/assets/img/slide_1.webp", name: "Project 1" },
  { img: "/assets/img/slide_2.webp", name: "Project 2" },
  { img: "/assets/img/slide_3.webp", name: "Project 3" },
  { img: "/assets/img/slide_4.webp", name: "Project 4" },
  { img: "/assets/img/slide_5.webp", name: "Project 5" },
];

export default function BoxSlides({
  children,
  via,
  isHidden,
  hide,
  setscaleTransform,
  subHeading,
  heading,
  sectionRef,
  smoothScrollProgress,
  latestN,
  onActive,
}) {
  const [isLoading, setIsLoading] = useState(true); // Control the loader visibility
  const [isTransitioning, setIsTransitioning] = useState(false); // Control the BoxSlides transition

  // Section-level transforms for scale based on scroll progress
  const scaleTransform = useTransform(
    smoothScrollProgress,
    [0.1, 0.2, 0.3, 0.4, 0.7, 1],
    [0.82, 0.89, 1, 1, 1, 0.85]
  );

  const subHeadingClip = useTransform(
    smoothScrollProgress,
    [0, 0.6, 0.6, 1],
    [
      "inset(100% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 100% 0%)",
    ]
  );
  const subHeadingOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.15, 0.6, 1],
    [0, 1, 1, 0]
  );

  const headingClip = useTransform(
    smoothScrollProgress,
    [0, 0.6, 0.6, 1],
    [
      "inset(100% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 100% 0%)",
    ]
  );
  const headingOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.25, 0.7, 1],
    [0, 1, 1, 0]
  );

  // Show/hide loader after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true); // Start transition after loading
      setTimeout(() => setIsLoading(false), 2000); // Hide loader after transition
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (setscaleTransform) setscaleTransform(scaleTransform);
  }, [scaleTransform]);

  return (
    <>
      <div ref={sectionRef} className={`mt-[-290px] relative z-[9]`}>
        <div className={`relative h-[220vh] ${!via && "pt-[100vh]"}`}>
          <div className="sticky top-0">
            <div className="relative w-full h-screen flex flex-col justify-center items-center">
              {heading && (
                <div className="heading pt-[50px] text-center text-[#000] overflow-hidden flex flex-col gap-2">
                  <motion.span
                    style={{
                      clipPath: subHeadingClip,
                      opacity: subHeadingOpacity,
                    }}
                  >
                    {subHeading}
                  </motion.span>
                  <motion.h2
                    style={{ clipPath: headingClip, opacity: headingOpacity }}
                    className="text-[32px]"
                  >
                    {heading}
                  </motion.h2>
                </div>
              )}

              {/* Render children */}
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

              {/* BoxSlides Fullscreen animation */}
              <motion.div
                className="absolute top-0 left-0 h-full w-full bg-white z-9 flex justify-center items-center"
                initial={{
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100vh",
                  position: "fixed",
                }}
                animate={{
                  top: isTransitioning ? "0" : "calc(-100vh + 290px)",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  scale: isTransitioning ? 0.85 : 1,
                  transition: { duration: 1, ease: "easeInOut" },
                }}
              >
                <div>
                  <h3 className="text-[16px] mb-[40px] tracking-[1px] text-center">
                    GTF Technologies
                  </h3>
                  <motion.div className="bg-[#ba9b53] overflow-hidden relative" initial={{height:'200px', width:'150px'}} animate={{height:'500px', width:'400px'}} transition={{duration:0.5,ease:'easeInOut'}}>
                    <AnimatePresence>
                      {frames.map((image, index) => (
                        <motion.div
                          key={index}
                          className={`absolute top-unset bottom-0 left-0 right-0`}
                          initial={{ height: 0, scale:2.5 }}
                          animate={{
                            height: "100%",
                            scale:1
                          }}
                          // exit={{
                          //   height: "100%",
                          // }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.5, // stagger each image by 0.3s
                            ease: "easeInOut",
                          }}
                        >
                          {/* Image */}
                          <motion.img
                            src={image.img}
                            alt={image.name}
                            className="h-full w-full object-cover"
                          />

                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
