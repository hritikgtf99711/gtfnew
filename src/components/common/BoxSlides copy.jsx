"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useTransform, scale, useScroll, useMotionValue, useSpring } from "framer-motion";

const frames = [
  { img: "/assets/img/loader/slide_1.webp", name: "Project 1" },
  { img: "/assets/img/loader/slide_2.webp", name: "Project 2" },
  { img: "/assets/img/loader/slide_4.webp", name: "Project 4" },
  { img: "/assets/img/loader/slide_5.webp", name: "Project 5" },
  { img: "/assets/img/loader/slide_3.webp", name: "Project 3" },
];

export default function BoxSlides({
  children,
  via,
  isHidden,
  hide,
  setscaleTransform,
  subHeading,
  heading,
  smoothScrollProgress,
  latestN,
  onActive,
}) {
  const [isLoading, setIsLoading] = useState(true); // Control the loader visibility
  const [isTransitioning, setIsTransitioning] = useState(false); // Control the BoxSlides transition
  const [isLoaderAnimationEnd, setIsLoaderAnimationEnd] = useState(false);
  const [removeLoaderContent, setRemoveLoaderContent] = useState(false);
  const [isLoaderTextVisible, setIsLoaderTextVisible] = useState(true);
  const [isTextAnStart, setIsTextAnStart] = useState(false);
  const [isTextAnEnd, setIsTextAnEnd] = useState(false);
  const [isBgAnStart, setIsBgAnStart] = useState(false);
  const [isAnBoxVisible, setIsAnBoxVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Section-level transforms for scale based on scroll progress
  const scaleTransform =  smoothScrollProgress
  ? useTransform(smoothScrollProgress, [0.1, 0.2, 0.3, 0.4, 0.7, 1], [0.82, 0.89, 1, 1, 1, 0.85])
  : useMotionValue(1);

  const subHeadingClip = smoothScrollProgress
    ? useTransform(
        smoothScrollProgress,
        [0, 0.6, 0.6, 1],
        ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
      )
    : useMotionValue("inset(0% 0% 0% 0%)");


  const subHeadingOpacity = smoothScrollProgress
    ? useTransform(smoothScrollProgress, [0, 0.15, 0.6, 1], [0, 1, 1, 0])
    : useMotionValue(1);

  const headingClip = smoothScrollProgress
    ? useTransform(
        smoothScrollProgress,
        [0, 0.6, 0.6, 1],
        ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
      )
    : useMotionValue("inset(0% 0% 0% 0%)");


  const headingOpacity = smoothScrollProgress
    ? useTransform(smoothScrollProgress, [0, 0.25, 0.7, 1], [0, 1, 1, 0])
    : useMotionValue(1);

  // Show/hide loader after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true); // Start transition after loading
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // setIsTextAnEnd(true)
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaderTextVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextAnStart(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBgAnStart(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (setscaleTransform) setscaleTransform(scaleTransform);
  }, [scaleTransform]);

  // Motion value for dynamic padding
  const paddingX = useMotionValue(150);
  const smoothPaddingX = useSpring(paddingX, {stiffness:120, damping:20})

  useEffect(()=>{
    const handleScroll = ()=>{
      if(!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start padding reduction when section top enters viewport
      const start = viewportHeight; // section top at bottom of viewport
      const end = viewportHeight * 0.2; // section top at 20% from top

      const clampedTop = Math.min(Math.max(rect.top, end), start);

      // Map clampedTop to padding
      const progress = (clampedTop - end) / (start - end); // 1 → 0
      const newPadding = 150 * progress; // 150px → 0px
      paddingX.set(newPadding);
      

    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => window.removeEventListener("scroll", handleScroll);
  },[paddingX])

  return (
    <>
      <motion.div ref={sectionRef} className={`mt-[-290px] relative z-[9] animated_section px-[150px]`}
        style={{
          paddingLeft: smoothPaddingX,
          paddingRight: smoothPaddingX,
        }}
      >
        <div
          className="bg-white z-9 flex justify-center items-center"
          
        >
          <div className="mx-auto px-[60px] relative">
            <div className={`relative h-[220vh] ${!via && "pt-[100vh]"}`}>
              <div className="sticky top-0">
                <div className="relative w-full h-screen flex flex-col justify-center items-center">
                  {/* {heading && (
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
                        style={{
                          clipPath: headingClip,
                          opacity: headingOpacity,
                        }}
                        className="text-[32px]"
                      >
                        {heading}
                      </motion.h2>
                    </div>
                  )} */}

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

                  {/* content loader animation */}

                  {/*<div className={`z-999 w-full`} 
                // initial={{marginTop:'calc(-100vh + 40vh)'}}
                
              >
                <motion.div className="fixed w-full"
                  initial={{top:'300px'}}
                  animate={{
                    top:isTextAnStart ? '100px' : '300px',
                    opacity:isTextAnEnd?'0':'1',
                    transition: { duration: 1.5, ease: "easeInOut" },
                  }}
                >
                  <h3 className="text-[16px] tracking-[1px] text-center">
                    GTF Technologies
                  </h3>
                </motion.div>

                /~ ${removeLoaderContent ? 'hidden' : 'block'} ~/
                <motion.div className={`fixed w-full ${removeLoaderContent ? 'hidden' : 'block'}`}
                  initial={{top:'20vh'}}
                  animate={{
                    // marginTop:isLoading ? 'calc(-100vh + 40vh)' : 0,
                    top:!isLoaderAnimationEnd ? '20vh' : 'calc(100vh - 145px)',
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }}
                  onAnimationComplete={()=>{
                    setTimeout(() => {
                      setRemoveLoaderContent(true);
                    }, 500);
                  }}
                > 
                  <div className="container mx-auto flex justify-center">
                    <div className="flex gap-4 items-start font-serif text-black w-full">
                      {frames.map((o, i) => (
                        <motion.div
                          key={i}
                          ref={(el) => (cardRefs.current[i] = el)}
                          className={`img_after relative overflow-hidden cursor-pointer group basis-[${
                            i === 2 ? "80%" : "50%"
                          }] ${i !== 2 && "hover:basis-[60%]"}`}
                          onClick={() => handleCardClick(i)}
                        >
                          {i === 2 && (
                            <div className="overflow-hidden relative h-[500px]">
                              <AnimatePresence>
                                {isAnBoxVisible && (
                                  frames?.map((image, index) => (
                                    <motion.div
                                      key={index}
                                      className={`absolute top-unset bottom-0 left-0 right-0`}
                                      initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.2 }}
                                      animate={{
                                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                        scale: 1,
                                      }}
                                      // exit={{
                                      //   height: "100%",
                                      // }}
                                      transition={{
                                        duration: 0.6,
                                        delay: index * 0.4, // stagger each image by 0.3s
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <motion.img
                                        src={image.img}
                                        alt={image.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </motion.div>
                                  ))
                                )}
                                
                              </AnimatePresence>
                              <motion.div
                                className="absolute bg-[#ba9b53] h-full w-full z-[-1]"
                                initial={{scale:0.3}}
                                  animate={{
                                    scale:isBgAnStart ? 1 : 0.3,
                                    transition: { duration: 1.5, ease: "easeInOut" },
                                  }}
                                  onAnimationComplete={()=>{
                                    setTimeout(() => {
                                      setIsAnBoxVisible(true);
                                    }, 200);
                                  }}
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BoxSlides Fullscreen animation */}
        {/* <motion.div
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
              ></motion.div> */}
      </motion.div>
    </>
  );
}
