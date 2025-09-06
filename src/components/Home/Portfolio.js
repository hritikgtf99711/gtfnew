import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useTransform, useMotionValueEvent } from "framer-motion";
import { useScroll } from "framer-motion";
export default function Portfolio({ smoothScrollProgress,sectionRef }) {
  const bottomSectionRef = useRef(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const cardRefs = useRef([]);

  const frames = [
    { img: "/assets/img/slide_1.webp", name: "Project 1" },
    { img: "/assets/img/slide_2.webp", name: "Project 2" },
    { img: "/assets/img/slide_3.webp", name: "Project 3" },
    { img: "/assets/img/slide_4.webp", name: "Project 4" },
    { img: "/assets/img/slide_5.webp", name: "Project 5" },
  ];


  const {scrollY}=useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    });
  const yTransformCard1 = useTransform(scrollY, [0, 0.5, 1], [0, 100, 250]);
  const yTransformCard4 = useTransform(scrollY, [0, 0.5, 1], [0, 100, 200]);

  const handleCardClick = (index) => {
    console.log(`Clicked project ${index + 1}`);
  };

  return (
    <motion.div
      ref={bottomSectionRef}
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
    </motion.div>
  );
}