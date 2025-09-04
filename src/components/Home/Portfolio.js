"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useTransform, useScroll,useMotionValueEvent } from "framer-motion";

export default function Portfolio({ portfolioIndex, scaleTransform, isHidden }) {
  const bottomSectionRef = useRef(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  const frames = [
    { img: "/assets/img/slide_1.webp", name: "Project 1" },
    { img: "/assets/img/slide_2.webp", name: "Project 2" },
    { img: "/assets/img/slide_3.webp", name: "Project 3" },
    { img: "/assets/img/slide_4.webp", name: "Project 4" },
    { img: "/assets/img/slide_5.webp", name: "Project 5" },
  ];

  const { scrollYProgress } = useScroll();


  const cardVariants = {
    initial: {
      flexBasis: "50%",
      opacity: 1,
      y: 12,
    },
    visible: (i) => ({
      flexBasis: i === 2 ? "80%" : "50%",
      opacity: 1,
      transition: {
        flexBasis: { duration: 0.1, ease: "linear" },
        y: { duration: 0.1, ease: "linear" },
        opacity: { duration: 0.3 },
      },
    }),
  };

  // Trigger card visibility on mount
  React.useEffect(() => {
    setCardsVisible(true);
  }, []);

  const handleCardClick = (index) => {
    console.log(`Clicked project ${index + 1}`);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
  console.log("Page scroll: ", latest)
})

  return (
    <motion.div
      ref={bottomSectionRef}
      className="relative w-full h-full p-[80px] flex justify-center m-auto items-center"
    >
      <motion.div className="w-full z-30">
        <div className="container mx-auto py-6 flex justify-center">
          <div className="flex gap-4 items-start text-black font-serif">
            <AnimatePresence>
              {frames.map((o, i) => (
                <motion.div
                  key={i}
                  layoutId={`project-${i}`}
                  custom={i}
                  variants={cardVariants}
                  initial="initial"
                  animate={cardsVisible ? "visible" : "initial"}
                  className={`img_after duration-300 group relative overflow-hidden cursor-pointer ${
                    i !== 2 && "hover:basis-[60%]"
                  }`}
                  onClick={() => handleCardClick(i)}
                  style={i === 1 || i === 4 ? { y:scrollYProgress } : {}}
                >
                  <div className="relative">
                    <motion.img
                      src={o.img}
                      alt={`Project ${i + 1}`}
                      className="w-full h-auto"
                      layoutId={`image-${i}`}
                    />
                    <motion.div
                      className="content-info absolute inset-0 flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center bg-[#fff] items-center text-black origin-center h-[90%] w-[90%] scale-0 transition-all duration-300 group-hover:scale-[1]"
                      layoutId={`content-${i}`}
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
    </motion.div>
  );
}