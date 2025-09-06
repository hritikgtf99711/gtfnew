"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export default function BoxSlides({
  children,
  via,
  isHidden,
  hide,
  setscaleTransform,
  subHeading,
  sectionRef,
  smoothScrollProgress,
  heading,
  latestN
}) {
  const [activeImage, setActiveImage] = useState(null);
  const cardRefs = useRef([]);

  const frames = [
    { img: "/assets/img/slide_1.webp", name: "Project 1" },
    { img: "/assets/img/slide_2.webp", name: "Project 2" },
    { img: "/assets/img/slide_3.webp", name: "Project 3" },
    { img: "/assets/img/slide_4.webp", name: "Project 4" },
    { img: "/assets/img/slide_5.webp", name: "Project 5" },
  ];

  const scaleTransform = useTransform(
    smoothScrollProgress,
    [0.1, 0.2, 0.3, 0.4, 0.7, 1],
    [0.82,0.89,1,1, 1, 0.85]
  );

  const imageScaleTransform = useTransform(
    smoothScrollProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [1.15, 1.05, 1, 1.05, 1.2]
  );
  const yTransformCard1 = useTransform(smoothScrollProgress, [0, 0.5, 1], [0, 100, 250]);
  const yTransformCard4 = useTransform(smoothScrollProgress, [0, 0.5, 1], [0, 100, 200]);
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

  const subHeadingClip = useTransform(
    smoothScrollProgress,
    [0, 0.6, 0.6, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );

  const subHeadingOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.15, 0.6, 1],
    [0, 1, 1, 0]
  );

  const headingClip = useTransform(
    smoothScrollProgress,
    [0, 0.6, 0.6, 1],
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

  useEffect(() => {
    if (setscaleTransform) setscaleTransform(scaleTransform);
  }, [scaleTransform]);

  return (
    <div  ref={sectionRef} className="mt-[-290px]">
      <div
       
        className={`relative h-[220vh] box_padding ${!via && "pt-[100vh]"} white_color_animation`}
      >
        <div className="sticky  top-0">
        <div className="relative">
              {/* <div
                className={`text-white ${
                  hide === 1 ? (isHidden ? "hidden" : "") : "hidden"
                } chapter_text flex gap-[2px] h-[100%] mb-[30px]`}
              >
                <span className="text-white">ALL CHAPTERS</span>
                <img src="./assets/img/downarrow.svg" alt="" width={"10"} />
              </div> */}

            <div className="flex  flex-col h-[100vh] m-auto overflow-hidden mx-auto">
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

             {/* <motion.div
               className="relative w-full h-full flex justify-center m-auto items-center"
             >
               <motion.div className="w-full z-30 p-[40px]">
                 <div className="container mx-auto py-6 flex justify-center">
                   <div className="flex gap-4 items-start text-black font-serif">
                     <AnimatePresence>
                       {frames.map((o, i) => (
                         <motion.div
                           key={i}
                           ref={(el) => (cardRefs.current[i] = el)}
                           initial={{ flexBasis: "50%", }}
                           animate={{
                             flexBasis: i === 2 ? "80%" : "50%",
                           }}
                           style={{
                             y: i === 1 ? yTransformCard1 : i === 4 ? yTransformCard4 : 0,
                           }}
                           className={`img_after duration-300 group relative overflow-hidden cursor-pointer ${
                             i !== 2 && "hover:basis-[60%]"
                           }`}
                           onClick={() => handleCardClick(i)}
                         >
                           <div className="relative">
                             <motion.img
                               src={o.img}
                               alt={`Project ${i + 1}`}
                               className="w-full h-auto"
                             />
                             <motion.div
                               className="content-info absolute inset-0 flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center bg-[#fff] items-center text-black origin-center h-[90%] w-[90%] scale-0 transition-all duration-300 group-hover:scale-[1]"
                             >
                               <h3 className="text-lg font-semibold">Project {i + 1}</h3>
                               <p className="text-sm">Brief description of Project {i + 1}</p>
                             </motion.div>
                           </div>
                           <h4 className="mt-[5px]">{o.name}</h4>
                         </motion.div>
                       ))}
                     </AnimatePresence>
                   </div>
                 </div>
               </motion.div>
             </motion.div> */}
            </div>
            <motion.div   
  className="absolute top-0 left-0 h-[100%] w-[100%] bg-white"
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
/>

          </div>
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
